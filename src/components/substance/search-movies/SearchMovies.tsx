import { useRef } from "react";
import Search from "../../molecul/search";
import "./style.css";

interface ISearchMovies {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  textSearchButton: string;
  action: () => void;
}

export default function SearchMovies({
  value,
  setValue,
  placeholder,
  textSearchButton,
  action,
}: ISearchMovies) {
  const refInput = useRef<HTMLInputElement>(null);
  const handleSetFocusOnInput = () => {
    refInput.current?.focus();
  };
  return (
    <div className="search-movies" onClick={handleSetFocusOnInput}>
      <Search
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        textSearchButton={textSearchButton}
        action={action}
        dataElem="search-input"
        refInput={refInput}
      />
    </div>
  );
}
