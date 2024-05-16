import useLanguageStore from "../../../store/useLanguageStore";
import EmptyFound from "../../substance/empty-found";

export default function EmptyFoundData() {
    const text = useLanguageStore((state) => state.textes.emptysearch);
    return <EmptyFound text={text} />;
}
