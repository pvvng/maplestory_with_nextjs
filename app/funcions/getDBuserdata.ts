// 현재 로그인 한 유저와 db에 저장된 유저 데이터가 일치하는지 검사하고
// , 일치하는 데이터는 userdata 함수로 return하는 함수

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { Document, WithId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function getDBuserdata(){
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

  return { session, isExist, userdata }
}