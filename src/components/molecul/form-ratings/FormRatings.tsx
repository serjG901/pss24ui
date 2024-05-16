import "./style.css";
import Inputnumber from "../../atom/input-number";

interface IFormRatings {
    title: string;
    voteAverageLte: number;
    voteAverageLteDefault: number;
    setVoteAverageLte: (value: number) => void;
    voteAverageGte: number;
    voteAverageGteDefault: number;
    setVoteAverageGte: (value: number) => void;
    placeholders: {
        from: string;
        to: string;
    };
    step: number;
    action?: () => void;
}

export default function FormRatings({
    title,
    voteAverageLte,
    voteAverageLteDefault,
    setVoteAverageLte,
    voteAverageGte,
    voteAverageGteDefault,
    setVoteAverageGte,
    placeholders,
    step,
}: IFormRatings) {
    return (
        <div className='form-ratings'>
            <label className='form-ratings-label'>{title}</label>
            <div className='form-ratings-inputs'>
                <Inputnumber
                    value={voteAverageGte}
                    setValue={setVoteAverageGte}
                    placeholder={placeholders.from}
                    step={step}
                    max={voteAverageLte}
                    min={voteAverageGteDefault}
                />
                <Inputnumber
                    value={voteAverageLte}
                    setValue={setVoteAverageLte}
                    placeholder={placeholders.to}
                    step={step}
                    max={voteAverageLteDefault}
                    min={voteAverageGte}
                />
            </div>
        </div>
    );
}
