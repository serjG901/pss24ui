import useLanguageStore from "../../../store/useLanguageStore";
import ErrorSearch from "../../substance/error-search";

export default function ErrorSearchData() {
  const text: string = useLanguageStore((state) => state.textes.errorSearch);
  return <ErrorSearch text={text} />;
}
