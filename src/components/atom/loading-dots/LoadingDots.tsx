import "./style.css";

interface ILoadingDots {
    children: React.ReactNode;
}

export default function LoadingDots({children}: ILoadingDots) {
  return (
    <div className="loading-dots">{children}</div>
  )
}
