import HideFilterSvg from "../../atom/hide-filter-svg";
import MyButton from "../../atom/my-button";
import "./style.css";

interface IHideFilter {
  filterShow: boolean;
  changeFilterShowState: () => void;
  titles: {
    hideFilter: string;
    showFilter: string;
  };
}

export default function HideFilter({
  filterShow,
  changeFilterShowState,
  titles,
}: IHideFilter) {
  return (
    <div
      className={`hide-filter ${filterShow ? "" : "hide-filter-show-filter"}`}
    >
      <MyButton
        action={changeFilterShowState}
        title={filterShow ? titles.hideFilter : titles.showFilter}
      >
        <HideFilterSvg />
      </MyButton>
    </div>
  );
}
