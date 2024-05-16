import useLanguageStore from "../../../store/useLanguageStore";
import useMoviesStore from "../../../store/useMoviesStore";
import Paginate from "../../substance/paginate";

export default function PaginateMoviesData() {
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
    state.pageActive,
    state.itemsPerPage,
    state.loadingMovies,
    state.errorMovies,
    state.setPageActive,
    state.setPreviousPage,
    state.setNextPage,
    state.totalMovies,
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
