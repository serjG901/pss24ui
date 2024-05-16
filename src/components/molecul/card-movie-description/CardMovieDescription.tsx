import "./style.css";
import RatingIcon from "../../atom/rating-icon";
import { altPostrUrl, posterUrl } from "../../../fetch/constants/urls";
import numberToKMG from "../../../clearFunctions/numberToKMG";
import LoadingDots from "../../atom/loading-dots";

interface ICardMovieDescription {
    originalTitle: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    genres: string[];
}
//poster for ${originalTitle} movie
export default function CardMovieDescription({
    originalTitle,
    posterPath,
    releaseDate,
    voteAverage,
    voteCount,
    genres,
}: ICardMovieDescription) {
    return (
        <div className='card-movie-description'>
            <div className='card-movie-description-poster'>
                <img
                    src={`${posterUrl}${posterPath}`}
                    alt={``}
                    width={170}
                    height={119}
                    className='card-movie-loading-poster'
                    onLoad={({
                        target,
                    }: {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        target: any;
                    }) => (target.className = "")}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onError={({ target }: { target: any }) => (
                        (target.error = null),
                        (target.src = altPostrUrl),
                        (target.className = "")
                    )}
                />
            </div>
            <div className='card-movie-description-body'>
                <div className='card-movie-description-originalTitle'>
                    {originalTitle}
                </div>
                <div className='card-movie-description-release'>
                    {releaseDate.slice(0, 4)}
                </div>
                <div className='card-movie-description-rating'>
                    <RatingIcon noAction={true} />
                    <div className='card-movie-description-rating-average'>
                        {Math.round(voteAverage * 10) / 10}
                    </div>
                    <div className='card-movie-description-rating-count'>
                        ({numberToKMG(voteCount)})
                    </div>
                </div>
                <div className='card-movie-description-genres'>
                    <div>
                        {!genres[0] ? (
                            <LoadingDots>Genres</LoadingDots>
                        ) : (
                            <>
                                Genres <span>{genres.join(", ")}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
