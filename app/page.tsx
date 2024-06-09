import MainPage from "./components/mainpage/MainPage";
import SiginForm from "./components/SiginTools/SignForm";
import { checkDependency } from "./funcions/fetch/checkDependency";
import getDBuserdata from "./funcions/fetch/getDBuserdata";

export default async function Home() {

  const {session, isExist, userdata} = await getDBuserdata();
  if(userdata !== undefined){
    let albumArr = await checkDependency(JSON.parse(userdata.playlist))

    // 로그인 한 경우에만 보여주는 화면
    if (session) {
      return(
        !isExist?
        <SiginForm session={session} />:
        <MainPage userdata = {userdata} albumArr={albumArr} />
      )
    }
  }

  // 로그인하지 않았을때 보여주는 화면
  return <h1 style={{textAlign: 'center'}}>로그인 후 이용 가능한 페이지입니다.</h1>
}



