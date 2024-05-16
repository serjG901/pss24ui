import "./style.css";

interface IProjectName {
  children: React.ReactNode;
}

export default function ProjectName({ children }: IProjectName) {
  return <div className="project-name">{children}</div>;
}
