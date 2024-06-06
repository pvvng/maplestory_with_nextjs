import { getServerSession } from "next-auth";
import MainPage from "./components/MainPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SiginOutBtn, SignInBtn } from "./components/SiginTools/SignBtns";
import { connectDB } from "@/util/database";
import SiginForm from "./components/SiginTools/SignForm";
import { Document, WithId } from "mongodb";

interface UserDataType {
  _id :string,
  email :string,
  name :string,
  playlist :string[],
}

export default async function Home() {

  let session = await getServerSession(authOptions);

  // db에서 회원 정보 불러오기
  const db = (await connectDB).db('maple-bgm');
  let res = await db.collection('userdata').find().toArray();

  // 회원가입 여부 확인
  let isExist = false;
  // 현재 로그인 한 유저 데이터 재설정
  let userdata : WithId<Document> | undefined = undefined

  res.map(ud => {
    if(ud.email === session?.user?.email){
      isExist = true;
      userdata = ud
    }
  })


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
