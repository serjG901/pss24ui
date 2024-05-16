import "./style.css";

interface IMyImage {
  src?: string;
  alt?: string;
}

export default function MyImage({ src = "", alt = "" }: IMyImage) {
  return <img src={src} alt={alt} />;
}
