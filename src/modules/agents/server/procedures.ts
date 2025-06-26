import { db } from "@/db";
import { agents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schema";
import { z } from "zod";


export const agentsRouter = createTRPCRouter({
    // todo: change "getone" to use "protectedprocedure"
     getOne: protectedProcedure.input(z.object({id: z.string()})).query(async () => {
        const [existingAgents] = await db.select().from(agents).where(eq(agents.id, input.id));
        return existingAgents;
    }),
    //todo: change "getmany" to use "protectedprocedure"
    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents);
        return data;
    }),
    create: protectedProcedure.input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdAgent;
        }),
})