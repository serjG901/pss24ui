import "./style.css";
import PaginatePageButton from "../../molecul/paginate-page-button";
import PaginateDots from "../../molecul/paginate-dots";
import calculatePaginationRenderPage from "../../../clearFunctions/calculatePaginationRenderPage";

interface IPaginate {
  pageActive: number;
  totalItems: number;
  itemsPerPage: number;
  setPageActive: (value: number) => void;
  setPreviousPage: () => void;
  setNextPage: () => void;
  loadingMovies: boolean;
  paginateTitlePrevious: string;
  paginateTitlePage: string;
  paginateTitleNext: string;
}

export default function Paginate({
  totalItems,
  pageActive,
  itemsPerPage,
  setPageActive,
  setPreviousPage,
  setNextPage,
  loadingMovies,
  paginateTitlePrevious,
  paginateTitlePage,
  paginateTitleNext,
}: IPaginate) {
  const pages = Math.ceil(totalItems / itemsPerPage);

  if (pages < 2) return null;
  const pageActiveRender = pageActive;
  const renderPages = calculatePaginationRenderPage(pageActiveRender, pages);
  return (
    <div className="paginate">
      <PaginatePageButton
        action={setPreviousPage}
        direction="left"
        title={paginateTitlePrevious}
        disabled={loadingMovies || pageActiveRender === 1}
      />
      {renderPages.map((pageNumber: number | string, index) => {
        if (typeof pageNumber == "string")
          return <PaginateDots key={pageNumber + index} />;
        if (typeof pageNumber == "number")
          return (
            <PaginatePageButton
              key={pageNumber}
              pageNumber={pageNumber}
              action={() => setPageActive(pageNumber)}
              pageActive={pageActiveRender}
              title={paginateTitlePage}
              disabled={loadingMovies}
            />
          );
      })}
      <PaginatePageButton
        action={setNextPage}
        direction="right"
        title={paginateTitleNext}
        disabled={loadingMovies || pageActiveRender === pages}
      />
    </div>
  );
}
