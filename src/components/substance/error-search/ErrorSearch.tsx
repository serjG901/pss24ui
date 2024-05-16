import ErrorSvg from "../../atom/error-svg";
import "./style.css";

interface IErrorSearch {
  text: string;
}

export default function ErrorSearch({ text }: IErrorSearch) {
  return (
    <div className="error-search">
      <ErrorSvg />
      <div className="error-search-text">{text}</div>
    </div>
  );
}
