import "./style.css";
import RatingIcon from "../../atom/rating-icon";
import { altPostrUrl, posterUrl } from "../../../fetch/constants/urls";
import premierDate from "../../../clearFunctions/premierDate";
import moneyWithComma from "../../../clearFunctions/moneyWithComma";
import durationToClock from "../../../clearFunctions/durationToClock";
import numberToKMG from "../../../clearFunctions/numberToKMG";

interface ICardMovieByIdDescription {
    originalTitle: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    genres: string[];
    runtime: number;
    budget: number;
    revenue: number;
}
//poster for ${originalTitle} movie
export default function CardMovieByIdDescription({
    originalTitle,
    posterPath,
    releaseDate,
    voteAverage,
    voteCount,
    genres,
    runtime,
    budget,
    revenue,
}: ICardMovieByIdDescription) {
    return (
        <div className='card-movie-byid-description'>
            <div className='card-movie-byid-description-poster'>
                <img
                    src={`${posterUrl}${posterPath}`}
                    alt={``}
                    width={170}
                    height={119}
                    className='card-movie-byid-loading-poster'
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
            <div className='card-movie-byid-description-body'>
                <div className='card-movie-byid-description-originalTitle'>
                    {originalTitle}
                </div>
                <div className='card-movie-byid-description-release'>
                    {releaseDate.slice(0, 4)}
                </div>
                <div className='card-movie-byid-description-rating'>
                    <RatingIcon noAction={true} />
                    <div className='card-movie-byid-description-rating-average'>
                        {Math.round(voteAverage * 10) / 10}
                    </div>
                    <div className='card-movie-byid-description-rating-count'>
                        ({numberToKMG(voteCount)})
                    </div>
                </div>
                <div className='card-movie-byid-description-genres-etc'>
                    <div>Duration</div>
                    <div>{runtime ? durationToClock(runtime) : "No info"}</div>
                    <div>Premiere</div>
                    <div>
                        {/\d\d\d\d-\d\d-\d\d/.test(releaseDate)
                            ? premierDate(releaseDate)
                            : "No info"}
                    </div>
                    <div>Budget</div>
                    <div>
                        {budget ? "$" + moneyWithComma(budget) : "No info"}
                    </div>
                    <div>Gross worldwide</div>
                    <div>
                        {revenue ? "$" + moneyWithComma(revenue) : "No info"}
                    </div>
                    <div>Genres</div>{" "}
                    <div>{genres.length ? genres.join(", ") : "No info"}</div>
                </div>
            </div>
        </div>
    );
}
