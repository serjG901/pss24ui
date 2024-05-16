import useMoviesStore from "../../../store/useMoviesStore";
import UserRating from "../../substance/user-rating";

export default function UserRatingData() {
    const [
        userRatingStars,
        setUserRatingStars,
        movieForRating,
        addRatedMovieId,
        deleteRatedMovieId
    ] = useMoviesStore((state) => [
        state.userRatingStars,
        state.setUserRatingStars,
        state.movieForRating,
        state.addRatedMovieId,
        state.deleteRatedMovieId
    ]);
    return (
        <UserRating
            userRatingStars={userRatingStars}
            setUserRatingStars={setUserRatingStars}
            movieForRating={movieForRating}
            addRatedMovieId={addRatedMovieId}
            deleteRatedMovieId={deleteRatedMovieId}
        />
    );
}
