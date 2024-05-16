import "./style.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useMoviesStore, { IMovie } from "../../store/useMoviesStore";
import EmptyRatedMoviesData from "../../components/thing/empty-rated-movies-data";
import CardsMovieLoadingData from "../../components/thing/cards-movie-loading-data";
import ErrorSearchData from "../../components/thing/error-search-data";
import CardMovieData from "../../components/thing/card-movie-data";
import PaginateRatedMoviesData from "../../components/thing/paginate-rated-movies-data";
import SearchMoviesData from "../../components/thing/search-movies-data";

export default function RatedMoviesPage() {
    const [movies, loading, error, getRatedMovies, itemsPerPage] =
        useMoviesStore((state) => [
            state.ratedMovies,
            state.loadingRatedMovies,
            state.errorRatedMovies,
            state.getRatedMovies,
            state.itemsPerPageRatedMovies,
        ]);

    useEffect(() => {
        getRatedMovies();
    }, []);

    return (
        <div className='rated-movies'>
            <div className='rated-movies-header'>
                <div className='rated-movies-header-title'>Rated movies</div>
                <SearchMoviesData />
            </div>
            {loading ? (
                <CardsMovieLoadingData itemsPerPage={itemsPerPage} />
            ) : error ? (
                <ErrorSearchData />
            ) : (
                <>
                    <div className='rated-movies-cards'>
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
                            <EmptyRatedMoviesData />
                        )}
                    </div>
                </>
            )}
            <PaginateRatedMoviesData />
        </div>
    );
}
