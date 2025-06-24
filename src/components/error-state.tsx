import { AlertCircle } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <AlertCircle className="size-6 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <p>{description}</p>
          <h6 className="text-lg font-medium">{title}</h6>
        </div>
      </div>
    </div>
  );
};
