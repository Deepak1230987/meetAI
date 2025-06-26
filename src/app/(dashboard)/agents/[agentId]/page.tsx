import AgentIdView, {
  AgentsIdViewError,
  AgentsIdViewLoading,
} from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    agentId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary>
      <Suspense fallback={<AgentsIdViewLoading />}>
        {/* ErrorBoundary is used to catch errors in the AgentIdView component */}
        {/* If an error occurs, it will render the fallback UI defined in AgentsIdViewError */}
        <ErrorBoundary fallback={<AgentsIdViewError />}>
          {/* AgentIdView is the main component that displays the agent details */}
          {/* It will throw an error if the agent is not found or if there is a network issue */}
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default Page;
