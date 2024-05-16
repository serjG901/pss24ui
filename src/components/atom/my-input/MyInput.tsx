import { useEffect, useState } from "react";
import "./style.css";

interface IInputText {
  type: string;
  step?: number;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  action?: () => void;
  dataElem?: string;
  refInput?: React.RefObject<HTMLInputElement>;
}

export default function InputText({
  type,
  step,
  value,
  setValue,
  placeholder,
  action,
  dataElem,
  refInput,
}: IInputText) {
  const [state, setState] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    ////console.log(event.key);
    if (event.key === "Enter") {
      action && action();
    }
  };

  useEffect(() => {
    setValue(state);
  }, [state, setValue]);

  useEffect(() => {
    if (state !== value) setState(value);
  }, [value]);

  return (
    <input
      ref={refInput}
      className="my-input"
      type={type}
      step={step}
      placeholder={placeholder}
      value={state}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      data-elem={dataElem}
    />
  );
}
