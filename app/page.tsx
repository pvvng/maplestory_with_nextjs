import { connectDB } from "@/util/database";
import MainPage from "./components/mainpage/MainPage";
import SiginForm from "./components/SiginTools/SignForm";
import { checkDependency } from "./funcions/fetch/checkDependency";
import getDBuserdata from "./funcions/fetch/getDBuserdata";

export default async function Home() {

  // 로그인 여부 확인, db에 회원 정보 존재하는지, db에 저장된 회원 정보
  const {session, isExist, userdata} = await getDBuserdata();

  // 로그인은 했으나, 회원가입이 되지 않은 경우
  if(session && !isExist){
    return <SiginForm session={session} />
  }

  if(!session) return <h1 style={{textAlign:'center'}}>로그인 후 이용 가능한 페이지입니다.</h1>

  let albumArr :string[] | undefined
  // // 회원가입을 한 경우
  if(userdata !== undefined){
    albumArr = await checkDependency(JSON.parse(userdata.playlist))

    // 로그인 한 경우에만 보여주는 화면
    if (session) {
      return <MainPage userdata = {userdata} albumArr={albumArr} />
    }
  }

}



