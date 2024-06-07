import MainPage from "./components/mainpage/MainPage";
import SiginForm from "./components/SiginTools/SignForm";
import getDBuserdata from "./funcions/fetch/getDBuserdata";

export default async function Home() {

  const {session, isExist, userdata} = await getDBuserdata();

  // 로그인 한 경우에만 보여주는 화면
  if (session) {
    return(
      !isExist?
      <SiginForm session={session} />:
      <MainPage userdata = {userdata} />
    )
  }

  // 로그인하지 않았을때 보여주는 화면
  return <h1>로그인 후 이용가능함ㅎ</h1>
}



