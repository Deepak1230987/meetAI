"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div
      className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4
   "
    >
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Creant an agent to get started with your meetings. Each agent will follow your instructions and can be used to schedule meetings."
          />
      )}
    </div>
  );
};
export default AgentsView;

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="An error occurred while trying to load the agents. Please try again later."
    />
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load the agents."
    />
  );
};
