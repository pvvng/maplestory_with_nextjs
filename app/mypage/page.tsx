import getDBuserdata from "../funcions/fetch/getDBuserdata";
import PlayList from "../components/playlist/PlayList";
import { checkDependency } from "../funcions/fetch/checkDependency";

export default async function MyPage(){

  const { session, isExist, userdata } = await getDBuserdata()

  if(userdata !== undefined){
    let userPlaylist = JSON.parse(userdata.playlist);
    let albumArr :string[] = await checkDependency(userPlaylist)

    if(!session) return <h1>로그인하라궁궁!!!</h1>

    if(session && albumArr !== undefined){
      return <PlayList userdata={userdata} albumArr={albumArr} />
    }
  }
}