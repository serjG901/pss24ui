import "./style.css";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Headerdata from "../../components/thing/header-data";
import UserRatingData from "../../components/thing/user-rating-data";
import useMoviesStore from "../../store/useMoviesStore";
import { useEffect } from "react";

export default function MainPage() {
    const location = useLocation();
    //console.log("location:", location);

    const [getGenres] = useMoviesStore((state) => [state.getGenres]);

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <div className='mainpage'>
            <Navigate
                to={location.pathname === "/" ? "/movies" : location.pathname}
                replace={true}
            />
            <UserRatingData />
            <Headerdata />
            <div className='outlet'>
                <Outlet />
            </div>
        </div>
    );
}
