import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IText {
    header: {
        projectName: string;
        links: { text: string; href: string }[];
    };
    filtermovies: {
        formName: string;
        formResetText: string;
        genres: string;
        voteAverage: string;
        release_year: string;
        sortBy: string;
        placeholders: {
            release_year: string;
            genres: string;
            voteAverageLte: string;
            voteAverageGte: string;
        };
        buttontext: string;
        loadingmessage: string;
        errormessage: string;
        showFilter: string;
        hideFilter: string;
    };
    searchmovies: {
        placeholder: string;
        textButton: string;
    };
    emptysearch: { explain: string; textButton: string };
    empty404: {
        explain: string;
        textButton: string;
    };
    emptyRatedMovies: { explain: string; textButton: string };
    errorSearch: string;
    altAddRating: string;
    altDeleteRating: string;
    paginateTitle: {
        previous: string;
        page: string;
        next: string;
    };
}

interface ITextes {
    [key: string]: IText;
}

interface LanguageState {
    currentLanguage: string;
    textes: IText;
    setCurentLanguage: (lang: string) => void;
}

const textes: ITextes = {
    en: {
        header: {
            projectName: "ArrowFlicks",
            links: [
                { text: "Movies", href: "/movies" },
                { text: "Rated movies", href: "/rated-movies" },
            ],
        },
        filtermovies: {
            genres: "Genres",
            voteAverage: "Ratings",
            release_year: "Release year",
            sortBy: "Sort by",
            formName: "Movies",
            formResetText: "Reset filters",
            placeholders: {
                release_year: "Select release year",
                genres: "Select genre",
                voteAverageLte: "From",
                voteAverageGte: "To",
            },
            buttontext: "Apply",
            loadingmessage: "Loading...",
            errormessage: "Error loading",
            showFilter: "Show filter",
            hideFilter: "Hide filter",
        },
        searchmovies: {
            placeholder: "Search movie title",
            textButton: "search",
        },
        emptysearch: {
            explain: "We don't have such movies, look for another one",
            textButton: "Search movie",
        },
        empty404: {
            explain: "We can’t find the page you are looking for",
            textButton: "Go Home",
        },
        emptyRatedMovies: {
            explain: "You haven't rated any films yet",
            textButton: "Find movies",
        },
        errorSearch: "Error. Something wrong!",
        altAddRating: "Rate the movie",
        altDeleteRating: "Change rate the movie",
        paginateTitle: {
            previous: "Previous page",
            page: "page",
            next: "Next page",
        },
    },
};

const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            currentLanguage: "en",
            textes: textes["en"],
            setCurentLanguage: (lang) =>
                set({ currentLanguage: lang, textes: textes[lang] }),
        }),
        {
            name: "currentLanguage-storage",
            partialize: (state) => state.currentLanguage,
        }
    )
);

export default useLanguageStore;
