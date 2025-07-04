import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { and, desc, eq, getTableColumns, ilike, count, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schema";
import { MeetingStatus } from "../types";
import { streamVideo } from "@/lib/stream-video";
import { GeneratedAvatarUri } from "@/lib/avatar";



export const meetingsRouter = createTRPCRouter({

    generateToken: protectedProcedure.mutation(async ({ ctx }) => {
        await streamVideo.upsertUsers([
            {
                id: ctx.auth.user.id,
                name: ctx.auth.user.name,
                role: 'admin',
                image:
                    ctx.auth.user.image ??
                    GeneratedAvatarUri({
                        seed: ctx.auth.user.name,
                        variant: "initials",
                    }),
            }

        ]);
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now
        const issuedAt = Math.floor(Date.now() / 1000) - 60; // 1 minute ago to account for clock skew

        const token = streamVideo.generateUserToken({
            user_id: ctx.auth.user.id,
            exp: expirationTime,
            validity_in_seconds: issuedAt
        })
        return token;
    }),
    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [removedMeeting] = await db
                .delete(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id),
                    )
                ).returning();
            if (!removedMeeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found"
                })
            }
            return removedMeeting;
        }),

    update: protectedProcedure
        .input(meetingsUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const [updatedMeeting] = await db
                .update(meetings)
                .set(input)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id),
                    )
                ).returning();
            if (!updatedMeeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found"
                })
            }
            return updatedMeeting;
        }),

    create: protectedProcedure.input(meetingsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db
                .insert(meetings)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            //todo: create stream call, upsert stream users
            const call = streamVideo.video.call("default", createdMeeting.id);

            await call.create({
                data: {
                    created_by_id: ctx.auth.user.id,
                    custom: {
                        meetingId: createdMeeting.id,
                        meetingName: createdMeeting.name,
                    },
                    settings_override: {
                        transcription: {
                            language: "en",
                            mode: "auto-on",
                            closed_caption_mode: "auto-on",
                        },
                        recording: {
                            mode: "auto-on",
                            quality: "1080p",
                        },
                    },

                }
            }
            );

            const [existingAgent] = await db.select().from(agents).where(eq(agents.id, createdMeeting.agentId));

            if (!existingAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found"
                });
            }

            await streamVideo.upsertUsers([
                {
                    id: existingAgent.id,
                    name: existingAgent.name,
                    role: 'user',
                    image:
                        GeneratedAvatarUri({
                            seed: existingAgent.name,
                            variant: "botttsNeutral",
                        }),
                }
            ]);

            return createdMeeting;
        }),
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const [existingMeetings] = await db.select({

            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),

        }).from(meetings).innerJoin(agents, eq(meetings.agentId, agents.id)).where(and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)));
        if (!existingMeetings) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Meeting not found",
            })
        }

        return existingMeetings;
    }),
    //todo: change "getmany" to use "protectedprocedure"
    getMany: protectedProcedure.input(
        z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish(),
            agentId: z.string().nullish(),
            status: z.enum([
                MeetingStatus.Upcoming,
                MeetingStatus.Active,
                MeetingStatus.Completed,
                MeetingStatus.Cancelled,
                MeetingStatus.Processing,
            ]).nullish(),
        })
    ).query(async ({ ctx, input }) => {
        const { page, pageSize, search, status, agentId } = input;
        const data = await db.select({

            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),

        }).from(meetings)
            .innerJoin(agents, eq(meetings.agentId, agents.id))
            .where(
                and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search ? ilike(meetings.name, `%${search}%`) : undefined,
                    status ? eq(meetings.status, status) : undefined,
                    agentId ? eq(meetings.agentId, agentId) : undefined,
                )

            ).orderBy(desc(meetings.createdAt), desc(meetings.id))
            .limit(pageSize)
            .offset((page - 1) * pageSize);

        const [total] = await db
            .select({ count: count() })
            .from(meetings)
            .innerJoin(agents, eq(meetings.agentId, agents.id))
            .where(
                and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search ? ilike(meetings.name, `%${search}%`) : undefined,
                    status ? eq(meetings.status, status) : undefined,
                    agentId ? eq(meetings.agentId, agentId) : undefined,
                )
            );
        const totalPages = Math.ceil(total.count / pageSize);
        return {
            items: data,
            total: total.count,
            totalPages,
        };
    }),

})