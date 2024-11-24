import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationItems = ({
  currentPage,
  itemsPerPage,
  totalItems,
  setCurrentPage,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  console.log("🚀 ~ pages:", pages);

  const setCurrentPageNo = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
    navigate("?" + searchParams.toString());
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
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
        <PaginationItem className="cursor-pointer" onClick={handlePrevPage}>
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
            <PaginationLink onClick={() => setCurrentPageNo(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer" onClick={handleNextPage}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationItems;
