import useMoviesStore from "../../../store/useMoviesStore";
import CardsMovieLoading from "../../substance/cards-movie-loading";

export default function MoviePageCardLoadingData() {
  const cardsInMoviePage = useMoviesStore(
    (state) => state.cardsInMovieByIdPage
  );

  return <CardsMovieLoading count={cardsInMoviePage} />;
}
