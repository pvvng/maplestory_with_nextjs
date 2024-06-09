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
    <div className="card p-4 mt-3" style={{borderRadius:'20px',}}>
      <p className="fw-bold" style={{fontSize:'20px'}}>🍁 테마별 추천 앨범</p>
      {
        themeAlbums.map ((ta, i) => <Popular popularAlbums={ta} image={image} key={i}/>)
      }
    </div>
  )
}