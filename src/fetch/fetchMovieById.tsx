import { IMovieById } from "../store/useMoviesStore";
import urlMovieById from "./constants/urlMovieById";

interface IFetchMovieById {
    id: number | string;
    controller?: AbortController;
}

export default async function fetchMovieById({
    id,
    controller,
}: IFetchMovieById): Promise<IMovieById | unknown> {
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
        //const functionName = fetchMovieById.name;
        //console.log(functionName + ":", res);
        return res;
    } catch (error) {
        //console.log(functionName + ":", error);
        return error;
    }
}
