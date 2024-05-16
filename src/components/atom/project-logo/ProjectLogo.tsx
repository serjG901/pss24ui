import "./style.css";
import LogoSvg from "../logo-svg";

interface IProjectLogo {
  children?: React.ReactNode;
}

export default function ProjectLogo({ children }: IProjectLogo) {
  return (
    <div className="project-logo">
      {children ? (
        typeof children === "string" ? (
          <img src={children} alt="logo" />
        ) : (
          children
        )
      ) : (
        <LogoSvg />
      )}
    </div>
  );
}
