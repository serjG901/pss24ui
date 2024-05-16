import FilterMovies from "../../substance/filter-movies";
import useLanguageStore from "../../../store/useLanguageStore";
import useMoviesStore from "../../../store/useMoviesStore";

export default function FilterMoviesData() {
    const [
        voteAverageLte,
        voteAverageLteDefault,
        setVoteAverageLte,
        voteAverageGte,
        voteAverageGteDefault,
        setVoteAverageGte,
        genres,
        withGenres,
        setWithGenres,
        releaseYears,
        primaryReleaseYear,
        setPrimaryReleaseYear,
        sorts,
        sortBy,
        setSortBy,
        filterIsEmpty,
        resetFilter,
        loadingGenres,
        errorGenres,
    ] = useMoviesStore((state) => [
        state.voteAverageLte,
        state.voteAverageLteDefault,
        state.setVoteAverageLte,
        state.voteAverageGte,
        state.voteAverageGteDefault,
        state.setVoteAverageGte,
        state.genres,
        state.withGenres,
        state.setWithGenres,
        state.releaseYears,
        state.primaryReleaseYear,
        state.setPrimaryReleaseYear,
        state.sorts,
        state.sortBy,
        state.setSortBy,
        state.filterIsEmpty,
        state.resetFilter,
        state.loadingGenres,
        state.errorGenres,
    ]);

    const textes = useLanguageStore((state) => state.textes);

    return (
        <FilterMovies
            filtermovies={textes.filtermovies}
            resetFilter={resetFilter}
            voteAverageLte={voteAverageLte}
            voteAverageLteDefault={voteAverageLteDefault}
            setVoteAverageLte={setVoteAverageLte}
            voteAverageGte={voteAverageGte}
            voteAverageGteDefault={voteAverageGteDefault}
            setVoteAverageGte={setVoteAverageGte}
            genres={genres}
            withGenres={withGenres}
            setWithGenres={setWithGenres}
            releaseYears={releaseYears}
            primaryReleaseYear={primaryReleaseYear}
            setPrimaryReleaseYear={setPrimaryReleaseYear}
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterIsEmpty={filterIsEmpty}
            loadingGenres={loadingGenres}
            errorGenres={errorGenres}
        />
    );
}
