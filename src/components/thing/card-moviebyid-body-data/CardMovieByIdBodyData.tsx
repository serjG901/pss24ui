import CardMovieByIdBody from "../../substance/card-movie-byid-body";
import { IMovieById } from "../../../store/useMoviesStore";

interface ICardMovieByIdData {
    movieById: IMovieById;
}

export default function CardMovieByIdData({ movieById }: ICardMovieByIdData) {
  
    return (
        <CardMovieByIdBody
            trailerKey={movieById.videos.results[0]?.key || ""}
            overview={movieById.overview}
            productionCompanies={movieById.production_companies}
        />
    );
}
