import useLanguageStore from "../../../store/useLanguageStore";
import useMoviesStore from "../../../store/useMoviesStore";
import EmptySearch from "../../substance/empty-search";

export default function EmptySearchData() {
  const resetFilter = useMoviesStore(state => state.resetFilter);
  const text = useLanguageStore((state) => state.textes.emptyRatedMovies);
  return <EmptySearch text={text} hasLink={true} action={resetFilter}/>;
}
