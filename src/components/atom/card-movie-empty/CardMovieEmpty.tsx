import "./style.css";

interface ICardMovieEmpty {
  children?: React.ReactNode;
}

export default function CardMovieEmpty({ children }: ICardMovieEmpty) {
  return <div className="card-movie-empty">{children}</div>;
}
