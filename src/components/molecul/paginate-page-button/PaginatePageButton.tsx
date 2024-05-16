import "./style.css";
import ArrowRightIcon from "../../atom/arrow-right-icon";
import ArrowLeftIcon from "../../atom/arrow-left-icon/";
import MyButton from "../../atom/my-button";

interface IPaginatePageButton {
  pageNumber?: string | number;
  action: () => void;
  pageActive?: number | number;
  direction?: "left" | "right";
  title: string;
  disabled?: boolean;
}

export default function PaginatePageButton({
  pageNumber = "",
  action,
  pageActive,
  direction,
  title,
  disabled,
}: IPaginatePageButton) {
  return (
    <div
      className={`paginate-page-button ${
        pageActive && pageActive === pageNumber
          ? "paginate-page-button_active"
          : ""
      } ${disabled ? "paginate-page-button_disabled" : ""}`}
    >
      <MyButton
        title={disabled ? "" : direction ? title : `${pageNumber} ${title}`}
        action={action}
        disabled={disabled || (!!pageActive && pageActive === pageNumber)}
      >
        {!direction ? (
          pageNumber
        ) : direction === "left" ? (
          <ArrowLeftIcon />
        ) : (
          <ArrowRightIcon />
        )}
      </MyButton>
    </div>
  );
}
