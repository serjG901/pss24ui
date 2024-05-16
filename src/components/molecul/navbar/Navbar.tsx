import "./style.css";
import MyLink from "../../atom/my-link";

interface ILink {
  text: string;
  href: string;
}

interface INavbar {
  links: ILink[];
}

export default function Navbar({ links }: INavbar) {
  return (
    <div className="navbar">
      {links.map(({ text, href }: ILink) => {
        return <MyLink key={href} text={text} href={href}></MyLink>;
      })}
    </div>
  );
}
