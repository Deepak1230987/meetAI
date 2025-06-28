import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <div className="bg-white ropunded-lg px-4 py-5 flex flex-col gap-y-8 items-center jucstify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting Completed"
        description="The meeting has been successfully completed. A summary will be available soon."
      />
    </div>
  );
};
