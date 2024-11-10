import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationItems = ({
  currentPage,
  itemsPerPage,
  setCurrentPage,
  totalItems,
}: Props) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          onClick={() => handlePrevPage()}
        >
          <PaginationPrevious />
        </PaginationItem>
        {pages.map((page, idx) => (
          <PaginationItem
            key={idx}
            className={cn(
              "cursor-pointer",
              currentPage === page ? "bg-neutral-100" : ""
            )}
          >
            <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem
          className="cursor-pointer"
          onClick={() => handleNextPage()}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationItems;
