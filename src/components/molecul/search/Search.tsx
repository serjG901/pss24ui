import "./style.css";
import Inputtext from "../../atom/my-input";
import MyButton from "../../atom/my-button";
import SearchIcon from "../../atom/search-icon";

interface ISearch {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  textSearchButton: string;
  action: () => void;
  dataElem?: string;
  refInput: React.RefObject<HTMLInputElement>;
}

export default function Search({
  value,
  setValue,
  placeholder,
  textSearchButton,
  action,
  dataElem,
  refInput,
}: ISearch) {
  const actionWithStop = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    action();
  };

  return (
    <div className="search">
      <SearchIcon />
      <Inputtext
        type="search"
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        action={action}
        dataElem={dataElem}
        refInput={refInput}
      />
      <MyButton action={actionWithStop} dataElem="search-button">
        {textSearchButton}
      </MyButton>
    </div>
  );
}
