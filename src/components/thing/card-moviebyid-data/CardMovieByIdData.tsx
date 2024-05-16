import useLanguageStore from "../../../store/useLanguageStore";
import CardMovieById from "../../substance/card-movie-byid";
import useMoviesStore, { IMovieById } from "../../../store/useMoviesStore";

interface ICardMovieByIdData {
    movieById: IMovieById;
}

export default function CardMovieByIdData({ movieById }: ICardMovieByIdData) {
    const [altAddRating, altDeleteRating] = useLanguageStore((state) => [
        state.textes.altAddRating,
        state.textes.altDeleteRating,
    ]);
    const [ratedMoviesIds, setMovieForRating, setUserRatingStars] =
        useMoviesStore((state) => [
            state.ratedMoviesIds,
            state.setMovieForRating,
            state.setUserRatingStars,
        ]);
    const isRated = !!ratedMoviesIds[movieById.id];

    const genreNames =
        movieById.genres.map(
            (genre: { id: number; name: string }) => genre.name
        ) || "";

    const action = () => {
        console.log(ratedMoviesIds);
        console.log(ratedMoviesIds[movieById.id]);
        const stars = ratedMoviesIds[movieById.id]?.stars || 0;
        setUserRatingStars(stars);
        setMovieForRating(movieById.id, stars, movieById.original_title);
        const popover = document.getElementById("user-rating-popover");
        popover?.showPopover();
        const popoverBody = document.getElementById("user-rating");
        popoverBody?.focus();
    };
    return (
        <CardMovieById
            action={action}
            movieId={movieById.id}
            originalTitle={movieById.original_title}
            posterPath={movieById.poster_path}
            releaseDate={movieById.release_date}
            voteAverage={movieById.vote_average}
            voteCount={movieById.vote_count}
            genres={genreNames}
            runtime={movieById.runtime}
            budget={movieById.budget}
            revenue={movieById.revenue}
            isRated={isRated}
            userRating={ratedMoviesIds[movieById.id]?.stars}
            altRating={isRated ? altDeleteRating : altAddRating}
        />
    );
}
