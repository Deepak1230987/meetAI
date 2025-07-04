import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justiify-end space-x-2 py-4">
        <Button disabled={page === 1} variant="outline" onClick={() => onPageChange(Math.max(1, page - 1))}>
          Prev
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
