import "./style.css";
import { Link, useLocation } from "react-router-dom";

interface IMyLink {
  text: string;
  href: string;
}

export default function MyLink({ text, href }: IMyLink) {
  const location = useLocation();
  return (
    <div className="my-link">
      <Link
        className={location.pathname === href ? "my-link_active" : ""}
        to={href}
      >
        {text}
      </Link>
    </div>
  );
}
