import { connectDB } from "@/util/database";
import getDBuserdata from "../funcions/getDBuserdata";
import PlayList from "../components/PlayList";

export default async function MyPage(){

  const { session, isExist, userdata } = await getDBuserdata()

  if(!session) return <h1>로그인하라궁궁!!!</h1>

  if(session){
    return <PlayList userdata={userdata} />
  }

}