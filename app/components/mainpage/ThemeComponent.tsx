import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import ThemeBox from "./ThemeBox";

interface AlbumType {
  theme: string;
  album: string[];
  icon: IconDefinition;
}

interface PropsType {
  themeAlbums : AlbumType[],
  image :{images : ImageDataType[]}
}

interface ImageDataType {
  [key :string] :string
}


export default function ThemeComponet ({themeAlbums, image} :PropsType){
  return (
    <div className="card p-4 mt-3" style={{borderRadius:'20px',}}>
      <p className="fw-bold" style={{fontSize:'20px'}}>🍁 테마별 추천 앨범</p>
      {
        themeAlbums.map ((ta, i) => <ThemeBox themeAlbums={ta} image={image} key={i}/>)
      }
    </div>
  )
}