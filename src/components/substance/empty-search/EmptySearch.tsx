import "./style.css";
import { Link } from "react-router-dom";
import MyButton from "../../atom/my-button";
import EmptySearchSvg from "../../atom/empty-search-svg";

interface IEmptySearch {
  text: { explain: string; textButton: string };
  hasLink?: boolean;
  action: () => void;
}

export default function EmptySearch({
  text,
  hasLink,
  action,
}: IEmptySearch) {
  return (
    <div className="empty-search">
      <EmptySearchSvg />
      <div className="empty-search-text">{text.explain}</div>
      {hasLink && (
        <div className="empty-search-button">
          <Link to={"/movies"}>
            <MyButton action={action}>{text.textButton}</MyButton>
          </Link>
        </div>
      )}
    </div>
  );
}
