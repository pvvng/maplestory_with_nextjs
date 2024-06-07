import DetailSong from "@/app/components/DetailSong";
import getDBuserdata from "@/app/funcions/getDBuserdata";
import { checkDependency } from "../../page";

interface ParamsType {
  album :string,
  title :string
}

export default async function MyPageAlbum(props :any){

  const params :ParamsType = props.params;

  const {session, isExist, userdata} = await getDBuserdata();

  if(userdata !== undefined){
    let userPlaylist = JSON.parse(userdata.playlist);
    userPlaylist = userPlaylist.filter(
      (e:string) => e !== (decodeURIComponent(params.title.replace('.mp3','')))
    )
    let albumArr :string[] = await checkDependency(userPlaylist)
    console.log(albumArr)

    if(!session) return <h1>로그인하라궁궁!!!</h1>

    if(session && albumArr !== undefined){
      return <DetailSong params={params} userdata={userdata} myPageComponent={true} albumArr={albumArr} />
    }
  }
}