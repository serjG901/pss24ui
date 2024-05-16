import { useParams } from "react-router-dom";
import "./style.css";
import useMoviesStore from "../../store/useMoviesStore";
import { useEffect } from "react";
import EmptySearchData from "../../components/thing/empty-found-data";
import MoviePageCardLoadingData from "../../components/thing/movie-page-card-loading-data";
import CardMovieByIdData from "../../components/thing/card-moviebyid-data";
import CardMovieByIdBodyData from "../../components/thing/card-moviebyid-body-data";
import ErrorSearchData from "../../components/thing/error-search-data";

export default function MovieByIdPage() {
    const { id } = useParams<"id">();
    const [movieByIdPage, loading, error, getMoviePageById] = useMoviesStore(
        (state) => [
            state.movieByIdPage,
            state.loadingMovieByIdPage,
            state.errorMovieByIdPage,
            state.getMovieByIdPage,
        ]
    );
    useEffect(() => {
        getMoviePageById(id || "");
    }, []);
    //console.log("movie", loading);
    //console.log(error);
    //console.dir(movieByIdPage);
    return (
        <div className='movie-byid-page'>
            {loading ? (
                <MoviePageCardLoadingData />
            ) : error ? (
                <ErrorSearchData />
            ) : (
                <div className='movie-byid-page-card'>
                    <div className='movie-byid-page-card-path'>
                        <div>Movies</div>/
                        <div>{movieByIdPage?.original_title}</div>
                    </div>
                    {movieByIdPage ? (
                        <>
                            <CardMovieByIdData movieById={movieByIdPage} />
                            <CardMovieByIdBodyData movieById={movieByIdPage} />
                        </>
                    ) : (
                        <EmptySearchData />
                    )}
                </div>
            )}
        </div>
    );
}
