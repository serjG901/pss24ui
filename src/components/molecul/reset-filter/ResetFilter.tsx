//import CloseIcon from "../../atom/close-icon";
import MyButton from "../../atom/my-button";
import "./style.css";

interface IresetFilter {
    filterIsEmpty: boolean;
    resetFilter: () => void;
    formResetText: string;
}

export default function resetFilter({
    filterIsEmpty,
    resetFilter,
    formResetText,
}: IresetFilter) {
    return (
        <div
            className={`reset-filter ${
                filterIsEmpty ? "" : "reset-filter-show"
            }`}
        >
            <MyButton action={filterIsEmpty ? undefined : resetFilter}>
                <div>{formResetText}</div>
            </MyButton>
        </div>
    );
}
//    <CloseIcon /> in button
