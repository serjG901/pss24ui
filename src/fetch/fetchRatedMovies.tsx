import { IMovie, IMovieById } from "../store/useMoviesStore";
import urlMovieById from "./constants/urlMovieById";

interface IFetchRatedMovies {
    idsForFetch: number[];
    controller?: AbortController;
}

export default async function fetchRatedMovies({
    idsForFetch,
    controller,
}: IFetchRatedMovies): Promise<IMovie[] | unknown> {
    const fetches = idsForFetch.map(
        (id: number) => async (): Promise<IMovie | unknown> => {
            const url = urlMovieById(id);
            //console.log(url);
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                    },
                    signal: controller?.signal,
                });
                const res: IMovieById = await response.json();
                const cutRes: IMovie = {
                    adult: res.adult,
                    backdrop_path: res.backdrop_path,
                    genre_ids: res.genres.map((genre) => genre.id),
                    id: res.id,
                    original_language: res.original_language,
                    original_title: res.original_title,
                    overview: res.overview,
                    popularity: res.popularity,
                    poster_path: res.poster_path,
                    release_date: res.release_date,
                    title: res.title,
                    video: res.video,
                    vote_average: res.vote_average,
                    vote_count: res.vote_count,
                };
                //const functionName = fetchMovieById.name;
                //console.log(functionName + ":", cutRes);
                return cutRes;
            } catch (error) {
                //console.log(functionName + ":", error);
                return error;
            }
        }
    );
    const movies = await Promise.all(fetches.map((fetch) => fetch()));
    return { movies };
}
