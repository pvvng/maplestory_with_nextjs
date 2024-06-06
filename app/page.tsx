import { getServerSession } from "next-auth";
import MainPage from "./components/MainPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SiginOutBtn, SignInBtn } from "./components/SiginTools/SignBtns";
import { connectDB } from "@/util/database";
import SiginForm from "./components/SiginTools/SignForm";
import { Document, WithId } from "mongodb";
import getDBuserdata from "./funcions/getDBuserdata";

export default async function Home() {

  const {session, isExist, userdata} = await getDBuserdata();

  // 로그인 한 경우에만 보여주는 화면
  if (session) {
    return(
      !isExist?
      <SiginForm session={session} />:
      <div>
        <SiginOutBtn/>
        <MainPage userdata = {userdata} />
      </div>
    )
  }

  // 로그인하지 않았을때 보여주는 화면
  return(
    <div>
      <SignInBtn/>
      <h1>로그인 후 이용가능함ㅎ</h1>
    </div>
  )
}
