import "./style.css";
import EmptyFoundSvg from "../../atom/empty-found-svg";

interface IEmptyFound {
  text: { explain: string; textButton: string };
}

export default function EmptyFound({
  text
}: IEmptyFound) {
  return (
    <div className="empty-found">
      <EmptyFoundSvg />
      <div className="empty-found-text">{text.explain}</div>
    </div>
  );
}
