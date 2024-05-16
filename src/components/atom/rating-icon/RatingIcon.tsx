import "./style.css";

interface IRatingIcon {
    filled?: boolean;
    noAction?: boolean;
}

export default function RatingIcon({ filled, noAction }: IRatingIcon) {
    return (
        <svg
            className={`${
                noAction
                    ? `rating-icon-noAction`
                    : `rating-icon ${filled ? "rating-icon-filled" : ""}`
            }`}
            width='28'
            height='28'
            viewBox='0 0 28 28'
            fill='#fab005'
            stroke='#fab005'
        >
            <path
                d='M13.9999 20.7084L6.79926 24.4942L8.17476 16.4757L2.34143 10.7975L10.3914 9.63086L13.9918 2.33569L17.5921 9.63086L25.6421 10.7975L19.8088 16.4757L21.1843 24.4942L13.9999 20.7084Z'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
