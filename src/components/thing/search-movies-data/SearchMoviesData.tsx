import useLanguageStore from "../../../store/useLanguageStore";
import useMoviesStore from "../../../store/useMoviesStore";
import SearchMovies from "../../substance/search-movies";

export default function SearchMoviesData() {
  const [applyFilter, keyword, setKeyword] = useMoviesStore((state) => [
    state.getRatedMovies,
    state.keyword,
    state.setKeyword,
  ]);

  const textes = useLanguageStore((state) => state.textes.searchmovies);

  return (
    <SearchMovies
      value={keyword}
      setValue={setKeyword}
      placeholder={textes.placeholder}
      textSearchButton={textes.textButton}
      action={applyFilter}
    />
  );
}
