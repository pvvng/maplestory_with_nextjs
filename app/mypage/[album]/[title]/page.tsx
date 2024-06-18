import DetailSong from "@/app/components/play/DetailSong";
import getDBuserdata from "@/app/funcions/fetch/getDBuserdata";
import { checkDependency } from "@/app/funcions/fetch/checkDependency";
import SiginForm from "@/app/components/SiginTools/SignForm";
import getTopTracks from "@/app/funcions/fetch/getTopTracks";

interface ParamsType {
  album :string,
  title :string
}

export default async function MyPageAlbum(props :any){

  const params :ParamsType = props.params;

  const {session, isExist, userdata} = await getDBuserdata();

  // 인기 급상승 노래 불러오기
  let topTrack = await getTopTracks(500);

  // 로그인은 했으나, 회원가입이 되지 않은 경우
  if(session && !isExist){
    return <SiginForm session={session} />
  }

  if(userdata !== undefined){
    let userPlaylist = JSON.parse(userdata.playlist);
 
    let albumArr :string[] = await checkDependency(userPlaylist)

    if(!session) return <h1 style={{textAlign:'center'}}>로그인 후 이용 가능한 페이지입니다.</h1>

    if(session && albumArr !== undefined){
      return <DetailSong params={params} userdata={userdata} topTrack={topTrack} myPageComponent={true} albumArr={albumArr} />

    }
  }
}