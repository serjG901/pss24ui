import CardsMovieLoading from "../../substance/cards-movie-loading";

export default function CardsMovieLoadingData({itemsPerPage}:{itemsPerPage: number}) {

  return <CardsMovieLoading count={itemsPerPage} />;
}
