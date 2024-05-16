import CardMovieEmpty from "../../atom/card-movie-empty";
import StarRating from "../../molecul/star-rating";
import CardMovieByIdDescription from "../../molecul/card-movie-byid-description";

interface ICardMovieById {
    action: () => void;
    movieId: number;
    originalTitle: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    genres: string[];
    runtime: number;
    budget: number;
    revenue: number;
    isRated: boolean;
    userRating: number;
    altRating: string;
}

export default function CardMovieById({
    action,
    movieId,
    originalTitle,
    posterPath,
    releaseDate,
    voteAverage,
    voteCount,
    genres,
    runtime,
    budget,
    revenue,
    isRated,
    userRating,
    altRating,
}: ICardMovieById) {
    return (
        <CardMovieEmpty>
            <CardMovieByIdDescription
                originalTitle={originalTitle}
                posterPath={posterPath}
                releaseDate={releaseDate}
                voteAverage={voteAverage}
                voteCount={voteCount}
                genres={genres}
                runtime={runtime}
                budget={budget}
                revenue={revenue}
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
