import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Popular from "./Popular";

interface AlbumType {
  theme: string;
  album: string[];
  icon: IconDefinition;
}

interface PropsType {
  themeAlbums : AlbumType[],
  image :any
}


export default function ThemeComponet ({themeAlbums, image} :PropsType){
  return (
    <div>
      {
        themeAlbums.map ((ta, i) => <Popular popularAlbums={ta} image={image} key={i}/>)
      }
    </div>
  )
}