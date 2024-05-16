import urls from "./urls";

export default function urlMovieById(id: number | string) {
  return `${urls.main}/${urls.movieById}/${id}/`;
}
