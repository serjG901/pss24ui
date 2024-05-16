import "./style.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useMoviesStore, { IMovie } from "../../store/useMoviesStore";
import FilterMoviesData from "../../components/thing/filter-movies-data";
import EmptyFoundData from "../../components/thing/empty-found-data";
import PaginateMoviesData from "../../components/thing/paginate-movies-data";
import ErrorSearchData from "../../components/thing/error-search-data";
import CardsMovieLoadingData from "../../components/thing/cards-movie-loading-data";
import CardMovieData from "../../components/thing/card-movie-data";

export default function MoviesPage() {
    const [movies, loading, error, getMovies, itemsPerPage] = useMoviesStore(
        (state) => [
            state.movies,
            state.loadingMovies,
            state.errorMovies,
            state.getMovies,
            state.itemsPerPage,
        ]
    );

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className='movies-page'>
            <FilterMoviesData />
            {loading ? (
                <CardsMovieLoadingData itemsPerPage={itemsPerPage} />
            ) : error ? (
                <ErrorSearchData />
            ) : (
                <div className='movies-page-cards'>
                    {movies.length ? (
                        movies.map((movie: IMovie) => (
                            <Link
                                to={`../movies/${movie.id}`}
                                data-elem={`movie-${movie.id}`}
                                key={movie.id}
                            >
                                <CardMovieData movie={movie} />
                            </Link>
                        ))
                    ) : (
                        <EmptyFoundData />
                    )}
                </div>
            )}
            <PaginateMoviesData />
        </div>
    );
}
