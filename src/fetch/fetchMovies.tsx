import { IMovies } from "../store/useMoviesStore";
import urlMovies from "./constants/urlMovies";
import serialiseQuery from "./helpers/serialiseQuery";

interface IFetchMovies {
    language: string;
    withGenres: number | null;
    primaryReleaseYear: number | null;
    voteAverageLte: number;
    voteAverageGte: number;
    sortBy: string;
    page: number;
    controller?: AbortController;
}

export default async function fetchMovies({
    language,
    withGenres,
    primaryReleaseYear,
    voteAverageLte,
    voteAverageGte,
    sortBy,
    page,
    controller,
}: IFetchMovies): Promise<IMovies | unknown> {
    const query = {
        language,
        withGenres,
        primaryReleaseYear,
        voteAverageLte,
        voteAverageGte,
        sortBy,
        page,
    };
    //console.log(query);
    try {
        const response = await fetch(urlMovies + serialiseQuery(query), {
            method: "GET",
            headers: {
                accept: "application/json",
            },
            signal: controller?.signal,
        });
        const res: IMovies = await response.json();
        //const functionName = fetchMovies.name;
        //console.log(functionName + ":", res);
        return res;
    } catch (error: unknown) {
        //console.log(functionName + ":", error);
        return error;
    }
}
