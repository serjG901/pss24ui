import useLanguageStore from "../../../store/useLanguageStore";
import Header from "../../substance/header";

export default function Headerdata() {
  const header = useLanguageStore((state) => state.textes.header);
  
  return (
    <Header projectName={header.projectName} links={header.links} />
  );
}
