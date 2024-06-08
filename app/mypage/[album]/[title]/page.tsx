import DetailSong from "@/app/components/play/DetailSong";
import getDBuserdata from "@/app/funcions/fetch/getDBuserdata";
import { checkDependency } from "@/app/funcions/fetch/checkDependency";

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

    if(!session) return <h1 style={{textAlign:'center'}}>로그인 후 이용 가능한 페이지입니다.</h1>

    if(session && albumArr !== undefined){
      return <DetailSong params={params} userdata={userdata} myPageComponent={true} albumArr={albumArr} />
    }
  }
}