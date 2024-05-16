import "./style.css";
import CardMovieLoading from "../../molecul/card-movie-loading";

interface ICardsMovieLoading {
  count: number;
}

export default function CardsMovieLoading({ count }: ICardsMovieLoading) {
  return (
    <div className="cards-movie-loading">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <CardMovieLoading key={index} />
        ))}
    </div>
  );
}
