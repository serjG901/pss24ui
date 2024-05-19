import "./style.css";
import MyButton from "../../atom/my-button";
import StarSvg from "../../atom/star-icon";

interface IStarRating {
    action: () => void;
    isRated: boolean;
    userRating: number;
    altRating: string;
    dataElem?: string;
}

export default function StarRating({
    action,
    isRated,
    userRating,
    altRating,
    dataElem,
}: IStarRating) {
    const actionWithPrevent = (event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();
        action();
    };

    return (
        <div className={`star-rating ${isRated ? "is-rated" : ""}`}>
            <MyButton
                action={actionWithPrevent}
                dataElem={dataElem}
                title={altRating}
            >
                <StarSvg filled={isRated} />
            </MyButton>
            {Number.isInteger(userRating) && (
                <div className='star-rating-user-rating'>{userRating}</div>
            )}
        </div>
    );
}
