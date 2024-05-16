import "./style.css";
import { Link, useRouteError } from "react-router-dom";
import Error404svg from "../../components/atom/error-404-svg";
import ProjectLogoName from "../../components/molecul/project-logo-name";
import useLanguageStore from "../../store/useLanguageStore";
import MyButton from "../../components/atom/my-button";

interface IError {
    status?: string;
    statusText?: string;
    data?: string;
    message?: string;
}

export default function ErrorPage() {
    const error: IError = useRouteError() as IError;
    console.error("errorpage", error);
    const [header, empty404] = useLanguageStore((state) => [
        state.textes.header,
        state.textes.empty404,
    ]);

    return (
        <div id='error-page' className='error-page'>
            <div className='logo404'>
                <ProjectLogoName projectName={header.projectName} />
            </div>
            <div className='body404'>
                <Error404svg />
                <div className='empty-404-link'>
                    <div className='empty-search-text'>{empty404.explain}</div>
                    <div className='button404'>
                        <Link to={"/movies"}>
                            <MyButton>{empty404.textButton}</MyButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
