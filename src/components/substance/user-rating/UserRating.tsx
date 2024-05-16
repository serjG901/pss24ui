import "./style.css";
import MyButton from "../../atom/my-button";
import RatingIcon from "../../atom/rating-icon";
import CloseIcon from "../../atom/close-icon";

interface IUserRating {
    userRatingStars: number;
    setUserRatingStars: (userRatingStars: number) => void;
    movieForRating: { id: number; stars: number; name: string };
    addRatedMovieId: (id: number, stars: number, name: string) => void;
    deleteRatedMovieId: (id: number) => void;
}

export default function UserRating({
    userRatingStars,
    setUserRatingStars,
    movieForRating,
    addRatedMovieId,
    deleteRatedMovieId,
}: IUserRating) {
    return (
        <div
            className='popover-wrapper'
            //@ts-expect-error ok with popover
            popover='auto'
            id='user-rating-popover'
            onClick={() =>
                document.getElementById("user-rating-popover")?.hidePopover()
            }
        >
            <div
                className='user-rating'
                title={`set rating stars for ${movieForRating.name}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='user-rating-body'>
                    <div className='user-rating-header'>
                        <MyButton
                            title={`set rating stars for ${movieForRating.name}`}
                            id='user-rating'
                        >
                            Your rating
                        </MyButton>
                        <div className='user-rating-header-close'>
                            <MyButton
                                title='close modal'
                                action={() =>
                                    document
                                        .getElementById("user-rating-popover")
                                        ?.hidePopover()
                                }
                            >
                                <CloseIcon />
                            </MyButton>
                        </div>
                    </div>
                    <div className='user-rating-name'>
                        {movieForRating.name}
                    </div>
                    <div className='user-rating-stars'>
                        {Array(10)
                            .fill(null)
                            .map((_, index) => (
                                <MyButton
                                    key={index}
                                    action={() => setUserRatingStars(index + 1)}
                                    title={`set ${index + 1} stars`}
                                >
                                    <RatingIcon
                                        filled={index + 1 <= userRatingStars}
                                    />
                                </MyButton>
                            ))}
                    </div>
                    <div className='user-rating-buttons'>
                        <MyButton
                            title={`save ${userRatingStars} rating stars`}
                            action={() => (
                                addRatedMovieId(
                                    movieForRating.id,
                                    userRatingStars,
                                    movieForRating.name
                                ),
                                document
                                    .getElementById("user-rating-popover")
                                    ?.hidePopover()
                            )}
                        >
                            Save
                        </MyButton>
                        <MyButton
                            title={`delete rating stars`}
                            action={() => (
                                setUserRatingStars(0),
                                deleteRatedMovieId(movieForRating.id),
                                document
                                    .getElementById("user-rating-popover")
                                    ?.hidePopover()
                            )}
                        >
                            Remove rating
                        </MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
