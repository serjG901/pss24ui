import "./style.css";
import MyButton from "../../atom/my-button";

interface IButtonApplyFilter {
  text: string;
  action: () => void;
  dataElem?: string;
}

export default function ButtonApplyFilter({ text, action, dataElem }: IButtonApplyFilter) {
  return (
    <div className="button-apply-filter">
      <MyButton action={action} dataElem={dataElem}>{text}</MyButton>
    </div>
  );
}
