import { create } from "zustand";
import { persist } from "zustand/middleware";
import fetchMovies from "../fetch/fetchMovies";
import fetchGenres from "../fetch/fetchGenres";
import fetchMovieById from "../fetch/fetchMovieById";
import fetchRatedMovies from "../fetch/fetchRatedMovies";

const maxReleaseYear = new Date().getFullYear();
const minReleaseYear = 1895; //release first film

const releaseYears = Array(maxReleaseYear - minReleaseYear + 1)
    .fill(null)
    .map((_, index) => ({
        id: maxReleaseYear - index,
        name: maxReleaseYear - index + "",
    }));

interface ISortBy {
    id: number;
    name: string;
    humanName: string;
}

const sorts = [
    {
        id: 1,
        name: "original_title.asc",
        humanName: "Original Title (start A)",
    },
    {
        id: 2,
        name: "original_title.desc",
        humanName: "Original Title (start Z)",
    },
    { id: 3, name: "popularity.asc", humanName: "Less Popular" },
    { id: 4, name: "popularity.desc", humanName: "Most Popular" },
    { id: 5, name: "revenue.asc", humanName: "Less Revenue" },
    { id: 6, name: "revenue.desc", humanName: "Most Revenue" },
    {
        id: 7,
        name: "primary_release_date.asc",
        humanName: "Most Recent Release Year",
    },
    { id: 8, name: "title.asc", humanName: "Title (start A)" },
    { id: 9, name: "title.desc", humanName: "Title (start Z)" },
    {
        id: 10,
        name: "primary_release_date.desc",
        humanName: "Most Earlier Release Year",
    },
    { id: 11, name: "vote_average.asc", humanName: "Less Rated" },
    { id: 12, name: "vote_average.desc", humanName: "Most Rated" },
    { id: 13, name: "vote_count.asc", humanName: "Less Voted" },
    { id: 14, name: "vote_count.desc", humanName: "Most Voted" },
];

export interface IMovieById {
    adult: boolean; //false;
    backdrop_path: string; //"/6G73mNyooWAEQTpckPSnFxFoNmc.jpg";
    belongs_to_collection: {
        id: number; //119;
        name: string; //"The Lord of the Rings Collection";
        poster_path: string; //"/oENY593nKRVL2PnxXsMtlh8izb4.jpg";
        backdrop_path: string; //"/bccR2CGTWVVSZAG0yqmy3DIvhTX.jpg";
    };
    budget: number; //79000000;
    genres: {
        id: number; //12;
        name: string; //"Adventure";
    }[];
    homepage: string; //"http://www.lordoftherings.net/";
    id: number; //121;
    imdb_id: string; //"tt0167261";
    origin_country: string[]; //["US"];
    original_language: string; //"en";
    original_title: string; //"The Lord of the Rings: The Two Towers";
    overview: string; //"Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.";
    popularity: number; //107.465;
    poster_path: string; //"/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg";
    production_companies: {
        id: number; //12;
        logo_path: string; //"/iaYpEp3LQmb8AfAtmTvpqd4149c.png";
        name: string; //"New Line Cinema";
        origin_country: string; //"US";
    }[];
    production_countries: {
        iso_3166_1: string; //"NZ";
        name: string; //"New Zealand";
    }[];
    release_date: string; //"2002-12-18";
    revenue: number; //926287400;
    runtime: number; //179;
    spoken_languages: [
        {
            english_name: string; //"English";
            iso_639_1: string; //"en";
            name: string; //"English";
        }
    ];
    status: string; //"Released";
    tagline: string; //"A new power is rising.";
    title: string; //"The Lord of the Rings: The Two Towers";
    video: boolean; //false;
    vote_average: number; //8.4;
    vote_count: number; //21119;
    videos: {
        results: {
            id: string; //"664044e4dc3cf2c24d43b0b9";
            iso_639_1: string; //"en";
            iso_3166_1: string; //"US";
            key: string; //"6M6fDqgDp_8";
            name: string; //"Caesar";
            official: boolean; //true;
            published_at: string; //"2024-05-12T02:00:04.000Z";
            site: string; //"YouTube";
            size: number; //1080;
            type: string; //"Teaser";
        }[];
    };
}

interface IRatedMovies {
    movies: IMovie[];
    total: number;
}

export interface IMovie {
    adult: boolean; //false;
    backdrop_path: string; // "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg";
    genre_ids: number[]; // [28, 878, 12];
    id: number; //823464;
    original_language: string; //"en";
    original_title: string; //"Godzilla x Kong: The New Empire";
    overview: string; //"Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.";
    popularity: number; //2040.246;
    poster_path: string; //"/nVOZuxRiBygJ3VmXc9QcDGZfHzD.jpg";
    release_date: string; //"2024-03-27";
    title: string; //"Godzilla x Kong: The New Empire";
    video: boolean; //false;
    vote_average: number; //6.507;
    vote_count: number; //923;
}

export interface IMovies {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IGenre {
    id: number;
    name: string;
}

interface MoviesState {
    movies: IMovie[];
    loadingMovies: boolean;
    errorMovies: unknown | null;
    getMovies: () => void;

    totalMovies: number;
    pageActive: number;
    itemsPerPage: number;
    setPageActive: (page: number) => void;
    setPreviousPage: () => void;
    setNextPage: () => void;

    language: string;

    voteAverageLte: number;
    voteAverageLteDefault: number;
    setVoteAverageLte: (voteAverageLte: number) => void;

    voteAverageGte: number;
    voteAverageGteDefault: number;
    setVoteAverageGte: (voteAverageGte: number) => void;

    sorts: ISortBy[];
    defaultSortBy: number;
    sortBy: number;
    setSortBy: (sortBy: number) => void;

    withGenres: number | null;
    setWithGenres: (genreId: number) => void;

    releaseYears: IGenre[];
    primaryReleaseYear: number | null;
    setPrimaryReleaseYear: (primaryReleaseYear: number) => void;

    filterIsEmpty: boolean;
    setFilterIsEmpty: () => void;

    genres: IGenre[];
    loadingGenres: boolean;
    errorGenres: unknown | null;
    getGenres: () => void;
    applyFilter: () => void;
    resetFilter: () => void;

    userRatingStars: number;
    setUserRatingStars: (userRatingStars: number) => void;

    movieForRating: { id: number; stars: number; name: string };
    setMovieForRating: (id: number, stars: number, name: string) => void;

    ratedMoviesIds: { [key: number]: { stars: number; name: string } };
    addRatedMovieId: (id: number, stars: number, name: string) => void;
    deleteRatedMovieId: (id: number) => void;

    keyword: string;
    setKeyword: (keyword: string) => void;
    searchRatedMovies: () => void;

    ratedMovies: IMovie[];
    loadingRatedMovies: boolean;
    errorRatedMovies: unknown | null;
    getRatedMovies: () => void;

    pageActiveRatedMovies: number;
    totalRatedMovies: number;
    itemsPerPageRatedMovies: number;
    setPageActiveRatedMovies: (page: number) => void;
    setPreviousPageRatedMovies: () => void;
    setNextPageRatedMovies: () => void;

    movieByIdPage: null | IMovieById;
    loadingMovieByIdPage: boolean;
    cardsInMovieByIdPage: number;
    errorMovieByIdPage: null | unknown;
    getMovieByIdPage: (id: number | string) => void;
}

let controller = new AbortController();

const useMoviesStore = create<MoviesState>()(
    persist(
        (set, get) => ({
            movies: [],
            loadingMovies: true,
            errorMovies: null,
            getMovies: async () => {
                controller.abort();
                controller = new AbortController();
                set({ loadingMovies: true });
                set({ errorMovies: null });
                set({ movies: [] });
                const language = get().language;
                const voteAverageLte = get().voteAverageLte;
                const voteAverageGte = get().voteAverageGte;
                const withGenres = get().withGenres;
                const primaryReleaseYear = get().primaryReleaseYear;
                const page = get().pageActive;
                const sortBy =
                    get().sorts.find((item) => item.id === get().sortBy)
                        ?.name || "";
                try {
                    const res = (await fetchMovies({
                        language,
                        withGenres,
                        primaryReleaseYear,
                        voteAverageLte,
                        voteAverageGte,
                        sortBy,
                        page,
                        controller,
                    })) as IMovies;
                    //@ts-expect-error check error
                    if (res?.message) throw res;
                    console.log(res.results);
                    set({
                        movies: [...res.results],
                        totalMovies:
                            res.total_results > 500 ? 500 : res.total_results,
                    });
                    set({ loadingMovies: false });
                } catch (error) {
                    console.dir(error);
                    //@ts-expect-error check error
                    if (error.name !== "AbortError") {
                        set({ errorMovies: error });
                        set({ loadingMovies: false });
                    }
                }
            },

            totalMovies: 0,
            pageActive: 1,
            itemsPerPage: 20,
            setPageActive: (page: number) => {
                set({ pageActive: page });
                get().getMovies();
            },
            setPreviousPage: () => {
                const page = get().pageActive;
                if (page > 0) {
                    set({ pageActive: get().pageActive - 1 });
                    get().getMovies();
                }
            },
            setNextPage: () => {
                const page = get().pageActive;
                const total = get().totalMovies;
                if (page < total) {
                    set({ pageActive: get().pageActive + 1 });
                    get().getMovies();
                }
            },

            language: "en-US",

            voteAverageLteDefault: 10,
            voteAverageLte: 10,
            setVoteAverageLte: (voteAverageLte) => {
                set({ voteAverageLte: voteAverageLte });
                get().setFilterIsEmpty();
                set({ pageActive: 1 });
                get().getMovies();
            },

            voteAverageGteDefault: 0,
            voteAverageGte: 0,
            setVoteAverageGte: (voteAverageGte) => {
                set({ voteAverageGte: voteAverageGte });
                get().setFilterIsEmpty();
                set({ pageActive: 1 });
                get().getMovies();
            },

            sorts: sorts,
            defaultSortBy: 4,
            sortBy: 4,
            setSortBy: (sortBy: number) => {
                set({ sortBy: sortBy });
                get().setFilterIsEmpty();
                set({ pageActive: 1 });
                get().getMovies();
            },

            withGenres: null,
            setWithGenres: (genreId: number) => {
                set({ withGenres: genreId });
                get().setFilterIsEmpty();
                set({ pageActive: 1 });
                get().getMovies();
            },

            releaseYears: releaseYears,
            primaryReleaseYear: null,
            setPrimaryReleaseYear: (primaryReleaseYear: number) => {
                set({ primaryReleaseYear });
                get().setFilterIsEmpty();
                set({ pageActive: 1 });
                get().getMovies();
            },

            filterIsEmpty: true,

            setFilterIsEmpty: () => {
                console.log(
                    get().sortBy,
                    get().withGenres,
                    get().primaryReleaseYear,
                    get().voteAverageLte,
                    get().voteAverageGte
                );
                set({
                    filterIsEmpty:
                        get().sortBy === 4 &&
                        !get().withGenres &&
                        !get().primaryReleaseYear &&
                        get().voteAverageLte === 10 &&
                        get().voteAverageGte === 0,
                });
            },
            genres: [],
            loadingGenres: true,
            errorGenres: null,
            applyFilter: () => {
                if (get().errorGenres) return;
                if (get().filterIsEmpty && get().movies.length) return;
                set({ pageActive: 1 });
            },
            resetFilter: () => {
                set({
                    voteAverageLte: get().voteAverageLteDefault,
                    voteAverageGte: get().voteAverageGteDefault,
                    withGenres: null,
                    primaryReleaseYear: null,
                    sortBy: get().defaultSortBy,
                });
                set({ pageActive: 1 });
                get().setFilterIsEmpty();
                get().getMovies();
            },
            getGenres: async () => {
                set({ loadingGenres: true });
                set({ errorGenres: null });
                set({ genres: [] });
                try {
                    const res = (await fetchGenres()) as { genres: IGenre[] };
                    set({ genres: [...res.genres] });
                } catch (error) {
                    set({ errorGenres: error });
                }
                set({ loadingGenres: false });
            },

            userRatingStars: 0,
            setUserRatingStars: (userRatingStars) => set({ userRatingStars }),

            movieForRating: { id: 0, stars: 0, name: "" },
            setMovieForRating: (id, stars, name) =>
                set({ movieForRating: { id, stars, name } }),

            ratedMoviesIds: {},
            addRatedMovieId: (id, stars, name) =>
                set({
                    ratedMoviesIds: {
                        ...get().ratedMoviesIds,
                        [id]: { stars, name },
                    },
                }),
            deleteRatedMovieId: (id) => {
                delete get().ratedMoviesIds[id];
                set({
                    ratedMoviesIds: {
                        ...get().ratedMoviesIds,
                    },
                });
            },

            keyword: "",
            setKeyword: (keyword) => {
                set({ keyword });
                if (keyword === "") {
                    set({ pageActiveRatedMovies: 1 });
                    get().getRatedMovies();
                }
                get().setFilterIsEmpty();
            },
            searchRatedMovies: () => {
                set({ pageActiveRatedMovies: 1 });
                get().getRatedMovies();
            },

            ratedMovies: [],
            loadingRatedMovies: true,
            errorRatedMovies: null,
            getRatedMovies: async () => {
                controller.abort();
                controller = new AbortController();
                set({ loadingRatedMovies: true });
                set({ errorRatedMovies: null });
                set({ ratedMovies: [] });
                const keyword = get().keyword;
                const ids =
                    keyword === ""
                        ? Object.keys(get().ratedMoviesIds)
                              .map((item) => +item)
                              .sort(
                                  (a, b) =>
                                      get().ratedMoviesIds[b].stars -
                                      get().ratedMoviesIds[a].stars
                              )
                        : Object.keys(get().ratedMoviesIds)
                              .map((item) => +item)
                              .filter((id: number) =>
                                  get()
                                      .ratedMoviesIds[id].name.toLowerCase()
                                      .includes(keyword.toLowerCase())
                              )
                              .sort(
                                  (a, b) =>
                                      get().ratedMoviesIds[b].stars -
                                      get().ratedMoviesIds[a].stars
                              );
                if (!ids.length) {
                    set({
                        loadingRatedMovies: false,
                        ratedMovies: [],
                        totalRatedMovies: 0,
                        pageActiveRatedMovies: 1,
                    });
                    return;
                }
                const count = get().itemsPerPageRatedMovies;
                const pageState = get().pageActiveRatedMovies;
                const maxPages = Math.ceil(ids.length / count);
                const page = maxPages < pageState ? maxPages : pageState;
                const idsForFetch = ids.slice((page - 1) * count, page * count);
                try {
                    const res = (await fetchRatedMovies({
                        idsForFetch,
                        controller,
                    })) as IRatedMovies;
                    console.log("res.movies");
                    console.dir(Array.isArray(res.movies));
                    //@ts-expect-error check error
                    const error = res.movies.find((r: unknown) => !!r.message);
                    console.dir(error);
                    if (error) throw error;
                    set({
                        ratedMovies: [...res.movies],
                        totalRatedMovies: ids.length > 500 ? 500 : ids.length,
                        pageActiveRatedMovies: page,
                    });
                    set({ loadingRatedMovies: false });
                } catch (error) {
                    console.dir(error);
                    //@ts-expect-error check error
                    if (error.name !== "AbortError") {
                        set({ errorRatedMovies: error });
                        set({ loadingRatedMovies: false });
                    }
                }
            },

            pageActiveRatedMovies: 1,
            totalRatedMovies: 0,
            itemsPerPageRatedMovies: 4,
            setPageActiveRatedMovies: (page: number) => {
                set({ pageActiveRatedMovies: page });
                get().getRatedMovies();
            },
            setPreviousPageRatedMovies: () => {
                const page = get().pageActiveRatedMovies;
                if (page > 0) {
                    set({
                        pageActiveRatedMovies: get().pageActiveRatedMovies - 1,
                    });
                    get().getRatedMovies();
                }
            },
            setNextPageRatedMovies: () => {
                const page = get().pageActiveRatedMovies;
                const total = get().totalRatedMovies;
                if (page < total) {
                    set({
                        pageActiveRatedMovies: get().pageActiveRatedMovies + 1,
                    });
                    get().getRatedMovies();
                }
            },

            movieByIdPage: null,
            loadingMovieByIdPage: true,
            cardsInMovieByIdPage: 2,
            errorMovieByIdPage: null,
            getMovieByIdPage: async (id) => {
                if (!id) throw new Error(`Can't find movie by id=${id}`);
                controller.abort();
                controller = new AbortController();
                set({ loadingMovieByIdPage: true });
                set({ movieByIdPage: null });
                set({ errorMovieByIdPage: null });
                try {
                    const res = (await fetchMovieById({
                        id,
                        controller,
                    })) as IMovieById;
                    console.log(res);
                    //@ts-expect-error check error
                    if (res?.message) throw res;
                    if (res?.id) {
                        set({ movieByIdPage: res });
                        set({ loadingMovieByIdPage: false });
                    }
                } catch (error) {
                    console.dir(error);
                    //@ts-expect-error check error
                    if (error.name !== "AbortError") {
                        set({ errorMovieByIdPage: error });
                        set({ loadingMovieByIdPage: false });
                    }
                }
            },
        }),
        {
            name: "rated-movies-ids-storage3",
            partialize: (state) => ({
                ratedMoviesIds: state.ratedMoviesIds,
                genres: state.genres,
            }),
        }
    )
);

export default useMoviesStore;
