import "./style.css";
import { useState } from "react";
import MySelect from "../../atom/my-select";
import FormRatings from "../../molecul/form-ratings";
import ResetFilter from "../../molecul/reset-filter";
import HideFilter from "../../molecul/hide-filter";

interface IGenre {
    id: number;
    name: string;
}

interface ISortBy {
    id: number;
    name: string;
    humanName: string;
}

interface IFiltermovies {
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
    resetFilter: () => void;
    voteAverageLte: number;
    voteAverageLteDefault: number;
    setVoteAverageLte: (voteAverageLte: number) => void;
    voteAverageGte: number;
    voteAverageGteDefault: number;
    setVoteAverageGte: (voteAverageGte: number) => void;
    genres: IGenre[];
    withGenres: number | null;
    setWithGenres: (withGenres: number) => void;
    releaseYears: IGenre[];
    primaryReleaseYear: number | null;
    setPrimaryReleaseYear: (withGenres: number) => void;
    sorts: ISortBy[];
    sortBy: number;
    setSortBy: (sortBy: number) => void;
    filterIsEmpty: boolean;
    loadingGenres: boolean;
    errorGenres: unknown;
    applyFilter?: () => void;
}

export default function Filtermovies({
    filtermovies,
    resetFilter,
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
    loadingGenres,
    errorGenres,
}: IFiltermovies) {
    const [filterShow, setFilterShow] = useState(true);
    const changeFilterShowState = () => setFilterShow(!filterShow);
    return (
        <div className='filter-movies'>
            <div className='filter-movies-header'>
                <div className='filter-movies-header-formname'>
                    {filtermovies.formName}
                </div>
            </div>
            <div
                className={`filter-movies-form ${
                    filterShow ? "" : "filter-movies-form_hide"
                }`}
            >
                <div className='filter-movies-genres'>
                    <MySelect
                        loading={loadingGenres}
                        loadingmessage={filtermovies.loadingmessage}
                        error={errorGenres}
                        errormessage={filtermovies.errormessage}
                        title={filtermovies.genres}
                        options={genres}
                        currentSelected={withGenres || ""}
                        setSelected={setWithGenres}
                        placeholder={filtermovies.placeholders.genres}
                        dataElem='genre-select'
                    />
                </div>
                <div className='filter-movies-release'>
                    <MySelect
                        loading={false}
                        loadingmessage={""}
                        error={null}
                        errormessage={""}
                        title={filtermovies.release_year}
                        options={releaseYears}
                        currentSelected={primaryReleaseYear || ""}
                        setSelected={setPrimaryReleaseYear}
                        placeholder={filtermovies.placeholders.release_year}
                        dataElem='genre-select'
                    />
                </div>
                <div className='filter-movies-ratings'>
                    <FormRatings
                        title={filtermovies.voteAverage}
                        voteAverageLte={voteAverageLte}
                        voteAverageLteDefault={voteAverageLteDefault}
                        setVoteAverageLte={setVoteAverageLte}
                        voteAverageGte={voteAverageGte}
                        voteAverageGteDefault={voteAverageGteDefault}
                        setVoteAverageGte={setVoteAverageGte}
                        placeholders={{
                            from: filtermovies.placeholders.voteAverageLte,
                            to: filtermovies.placeholders.voteAverageGte,
                        }}
                        step={1}
                    />
                </div>

                <ResetFilter
                    filterIsEmpty={filterIsEmpty}
                    resetFilter={resetFilter}
                    formResetText={filtermovies.formResetText}
                />
            </div>
            <div className='filter-movies-sortby'>
                <MySelect
                    loading={false}
                    loadingmessage={""}
                    error={null}
                    errormessage={""}
                    title={filtermovies.sortBy}
                    options={sorts}
                    currentSelected={sortBy || ""}
                    setSelected={setSortBy}
                    placeholder={filtermovies.placeholders.release_year}
                    dataElem='sortby-select'
                />
            </div>
            <HideFilter
                filterShow={filterShow}
                changeFilterShowState={changeFilterShowState}
                titles={{
                    hideFilter: filtermovies.hideFilter,
                    showFilter: filtermovies.showFilter,
                }}
            />
        </div>
    );
}
