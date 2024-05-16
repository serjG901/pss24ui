import "./style.css";
import { useRef } from "react";
import MyButton from "../my-button";
import ArrowUpIcon from "../arrow-up-icon";
import ArrowDownIcon from "../arrow-down-icon";

interface IInputNumber {
    value: number;
    setValue: (value: number) => void;
    placeholder: string;
    step: number;
    max: number;
    min: number;
    dataElem?: string;
    action?: () => void;
}

export default function InputNumber({
    value,
    setValue,
    placeholder,
    step,
    max,
    min,
    dataElem,
}: IInputNumber) {
    const isFirstContact = useRef(value === 10 || value === 0 ? true : false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        isFirstContact.current = false;
        let val = event.target.value;
        if (/\d{1,2}/.test(val)) {
            val = +val > 10 ? "10" : +val < 0 ? "0" : val;
            setValue(+val);
        }
    };

    const handlePlus = () => {
        isFirstContact.current = false;
        setValue(value >= max ? value  : value  + step);
    };

    const handleMinus = () => {
        isFirstContact.current = false;
        setValue(value <= min ? value : value - step);
    };

    return (
        <div className='input-number'>
            <input
                type='number'
                placeholder={placeholder}
                value={isFirstContact.current ? "" : value}
                onChange={handleChange}
                step={step}
                max={max}
                min={min}
                data-elem={dataElem}
            />
            <div className='input-number-arrows'>
                <MyButton
                    action={handlePlus}
                    title={`+${step}`}
                    disabled={value === max}
                >
                    <ArrowUpIcon />
                </MyButton>
                <MyButton
                    action={handleMinus}
                    title={`-${step}`}
                    disabled={value === min}
                >
                    <ArrowDownIcon />
                </MyButton>
            </div>
        </div>
    );
}
