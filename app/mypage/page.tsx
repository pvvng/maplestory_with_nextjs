import getDBuserdata from "../funcions/fetch/getDBuserdata";
import PlayList from "../components/playlist/PlayList";
import { checkDependency } from "../funcions/fetch/checkDependency";
import SiginForm from "../components/SiginTools/SignForm";

export default async function MyPage(){

  const { session, isExist, userdata } = await getDBuserdata()

  // // 로그인은 했으나, 회원가입이 되지 않은 경우
  // if(session && !isExist){
  //   return <SiginForm session={session} />
  // }

  // 로그인은 했으나, 회원가입이 되지 않은 경우
  if(session && !isExist){
    return <SiginForm session={session} />
  }

  if(!session) return <h1 style={{textAlign:'center'}}>로그인 후 이용 가능한 페이지입니다.</h1>
  
  // 사용중인 유저가 회원가입이 완료되어있고, userdata를 받았을때
  if(userdata !== undefined){
    let userPlaylist = JSON.parse(userdata.playlist);
    console.log(userPlaylist)
    // user가 저장한 플레이리스트의 의존성 확인
    let albumArr :string[] = await checkDependency(userPlaylist)

    // if (session && albumArr !== undefined) {
      return (
        <div className="p-md-5">
          <PlayList userdata={userdata} albumArr={albumArr} />
        </div>
      )  
    // }
  }
}