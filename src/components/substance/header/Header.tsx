import "./style.css";
import ProjectLogoName from "../../molecul/project-logo-name";
import Navbar from "../../molecul/navbar";

interface IHeader {
  projectName: string;
  logo?: string;
  links: { text: string; href: string }[];
}

export default function Header({ projectName, logo, links }: IHeader) {
  return (
    <div className="header">
      <div className="header-content">
        <ProjectLogoName projectName={projectName} projectLogo={logo} />
        <Navbar links={links} />
      </div>
    </div>
  );
}
