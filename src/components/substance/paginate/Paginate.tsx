import "./style.css";
import PaginatePageButton from "../../molecul/paginate-page-button";
import PaginateDots from "../../molecul/paginate-dots";

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

function calculatePagination(
  pageActiveRender: number,
  pages: number
): (number | string)[] {
  let renderPages: (number | string)[] = [];
  switch (pageActiveRender) {
    case 1:
      renderPages = [
        [1, 2],
        [1, 2, 3],
        [1, 2, "..", pages],
      ][pages > 3 ? 2 : pages - 2];
      break;
    case 2:
      renderPages = [
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 3, "..", pages],
      ][pages > 4 ? 3 : pages - 2];
      break;

    case 3:
      renderPages = [
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, "..", pages],
      ][pages > 5 ? 3 : pages - 3];
      break;

    default:
      renderPages = [
        [1, "..", pages - 1, pages],
        [1, "..", pages - 2, pages - 1, pages],
        [1, "..", pages - 3, pages - 2, pages - 1, pages],
        [
          1,
          "..",
          pageActiveRender - 1,
          pageActiveRender,
          pageActiveRender + 1,
          "..",
          pages,
        ],
      ][pages - pageActiveRender > 3 ? 3 : pages - pageActiveRender];
  }
  return renderPages;
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
  const renderPages = calculatePagination(pageActiveRender, pages);
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
