import CardMovieEmpty from "../../atom/card-movie-empty";
import StarRating from "../../molecul/star-rating";
import CardMovieDescription from "../../molecul/card-movie-description";

interface ICardMovie {
    movieId: number;
    originalTitle: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    genres: string[];
    action: () => void;
    isRated: boolean;
    userRating: number;
    altRating: string;
}

export default function CardMovie({
    movieId,
    originalTitle,
    posterPath,
    releaseDate,
    voteAverage,
    voteCount,
    genres,
    action,
    isRated,
    userRating,
    altRating,
}: ICardMovie) {
    return (
        <CardMovieEmpty>
            <CardMovieDescription
                originalTitle={originalTitle}
                posterPath={posterPath}
                releaseDate={releaseDate}
                voteAverage={voteAverage}
                voteCount={voteCount}
                genres={genres}
            />
            <StarRating
                action={action}
                isRated={isRated}
                userRating={userRating}
                altRating={altRating}
                dataElem={`movie-${movieId}-shortlist-button`}
            />
        </CardMovieEmpty>
    );
}
