import useLanguageStore from "../../../store/useLanguageStore";
import useMoviesStore from "../../../store/useMoviesStore";
import Paginate from "../../substance/paginate";

export default function PaginateRatedMoviesData() {
  const [
    pageActive,
    itemsPerPage,
    loadingMovies,
    errorMovies,
    setPageActive,
    setPreviousPage,
    setNextPage,
    totalMovies,
  ] = useMoviesStore((state) => [
    state.pageActiveRatedMovies,
    state.itemsPerPageRatedMovies,
    state.loadingRatedMovies,
    state.errorRatedMovies,
    state.setPageActiveRatedMovies,
    state.setPreviousPageRatedMovies,
    state.setNextPageRatedMovies,
    state.totalRatedMovies,
  ]);

  const paginateTitle = useLanguageStore((state) => state.textes.paginateTitle);

  if (errorMovies) return null;
  return (
    <Paginate
      pageActive={pageActive}
      itemsPerPage={itemsPerPage}
      setPageActive={setPageActive}
      totalItems={totalMovies}
      setPreviousPage={setPreviousPage}
      setNextPage={setNextPage}
      loadingMovies={loadingMovies}
      paginateTitlePrevious={paginateTitle.previous}
      paginateTitlePage={paginateTitle.page}
      paginateTitleNext={paginateTitle.next}
    />
  );
}
