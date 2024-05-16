import "./style.css";
import ProjectName from "../../atom/project-name";
import ProjectLogo from "../../atom/project-logo";

interface IProjectLogoName {
  projectName: string;
  projectLogo?: React.ReactNode;
}

export default function ProjectLogoName({
  projectName,
  projectLogo,
}: IProjectLogoName) {
  return (
    <div className="project-logo-name">
      <ProjectLogo>{projectLogo}</ProjectLogo>
      <ProjectName>{projectName}</ProjectName>
    </div>
  );
}
