import "./style.css";

interface IMyButton {
    id?: string;
    children: React.ReactNode;
    action?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    dataElem?: string;
    title?: string;
    handleHover?: () => void;
}

export default function MyButton({
    id,
    children,
    action,
    disabled,
    dataElem,
    title,
    handleHover,
}: IMyButton) {
    return (
        <button
            id={id}
            onMouseOver={handleHover}
            className='my-button'
            onClick={action}
            disabled={disabled}
            data-elem={dataElem}
            title={title}
        >
            {children}
        </button>
    );
}
