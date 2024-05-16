import urlGenres from "./constants/urlGenres";
import { IGenre } from "../store/useMoviesStore";

export default async function fetchCatalogues(
    controller?: AbortController
): Promise<IGenre[] | unknown> {
    try {
        const response = await fetch(urlGenres, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
            signal: controller?.signal,
        });
        const res: IGenre[] = await response.json();
        //const functionName = fetchCatalogues.name;
        //console.log(functionName + ":", res);
        return res;
    } catch (error) {
        //console.log(functionName + ":", error);
        return error;
    }
}
