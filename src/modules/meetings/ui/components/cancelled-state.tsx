import { EmptyState } from "@/components/empty-state";




export const CancelledState = () => {
  return (
    <div className="bg-white ropunded-lg px-4 py-5 flex flex-col gap-y-8 items-center jucstify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting is cancelled"
        description="This meeting has been cancelled and cannot be joined."
      />

    
    </div>
  );
};
