import useLanguageStore from "../../../store/useLanguageStore";
import CardMovie from "../../substance/card-movie";
import useMoviesStore, { IMovie } from "../../../store/useMoviesStore";

interface ICardMovieData {
    movie: IMovie;
}

export default function CardMovieData({ movie }: ICardMovieData) {
    const [altAddRating, altDeleteRating] = useLanguageStore((state) => [
        state.textes.altAddRating,
        state.textes.altDeleteRating,
    ]);
    const [ratedMoviesIds, genres, setMovieForRating, setUserRatingStars] =
        useMoviesStore((state) => [
            state.ratedMoviesIds,
            state.genres,
            state.setMovieForRating,
            state.setUserRatingStars,
        ]);
    const isRated = !!ratedMoviesIds[movie.id];
    const genreNames = movie.genre_ids.map(
        (id: number) =>
            genres.find(
                (genre: { id: number; name: string }) => genre.id === id
            )?.name || ""
    );
    const action = () => {
        console.log(ratedMoviesIds);
        console.log(ratedMoviesIds[movie.id]);
        const stars = ratedMoviesIds[movie.id]?.stars || 0;
        setUserRatingStars(stars);
        setMovieForRating(movie.id, stars, movie.original_title);
        const popover = document.getElementById("user-rating-popover");
        popover?.showPopover();
        const popoverBody = document.getElementById("user-rating");
        popoverBody?.focus();
    };
    return (
        <CardMovie
            movieId={movie.id}
            originalTitle={movie.original_title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
            genres={genreNames}
            action={action}
            isRated={isRated}
            userRating={ratedMoviesIds[movie.id]?.stars}
            altRating={isRated ? altDeleteRating : altAddRating}
        />
    );
}
