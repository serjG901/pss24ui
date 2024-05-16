import "./style.css";
import { useState } from "react";
import ArrowSelectIcon from "../arrow-select-icon";
interface ISelect {
    loading: boolean;
    loadingmessage: string;
    error: unknown;
    errormessage: string;
    title: string;
    currentSelected: string | number;
    options: { id: number; name: string; humanName?: string }[];
    setSelected: (selected: number) => void;
    placeholder: string;
    action?: () => void;
    dataElem?: string;
}
export default function Select({
    loading,
    loadingmessage,
    error,
    errormessage,
    title,
    currentSelected,
    options,
    setSelected,
    placeholder,
    dataElem,
}: ISelect) {
    const [isInFocus, setIsInFocus] = useState(false);
    ////console.log(currentSelected);
    if (loading) {
        options = [];
        placeholder = loadingmessage;
    }

    if (error) {
        options = [];
        placeholder = errormessage;
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(+e.target.value);
    };

    const handleFocus = () => {
        setIsInFocus(true);
    };
    const handleBlur = () => {
        setIsInFocus(false);
    };

    return (
        <div className='my-select'>
            <label className='my-select-label'>{title}</label>
            <select
                title={title}
                value={currentSelected}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={loading || !!error}
                data-elem={dataElem}
                className={`my-select-select ${
                    currentSelected
                        ? "my-select-select-filled"
                        : "my-select-select-empty"
                } ${
                    loading
                        ? "my-select-select-loading"
                        : error
                        ? " my-select-select-error"
                        : ""
                }`}
            >
                <option value='' disabled>
                    {placeholder}
                </option>
                {options.map((option) => {
                    return (
                        <option
                            key={option.id}
                            value={option.id}
                            className='my-select-select-option'
                        >
                            {option.humanName ? option.humanName : option.name}
                        </option>
                    );
                })}
            </select>
            <div
                className={`my-select-arrow ${
                    isInFocus ? "my-select-arrow-up" : ""
                }`}
            >
                <ArrowSelectIcon />
            </div>
        </div>
    );
}
