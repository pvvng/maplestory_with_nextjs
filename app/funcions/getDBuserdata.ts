// 현재 로그인 한 유저와 db에 저장된 유저 데이터가 일치하는지 검사하고
// , 일치하는 데이터는 userdata 함수로 return하는 함수

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";

export default async function getDBuserdata() {
  // 현재 세션 가져오기
  const session = await getServerSession(authOptions);

  // DB 연결
  const db = (await connectDB).db('maple-bgm');
  
  // 사용자 정보 가져오기
  const userDataCollection = db.collection('userdata');
  const allUsers = await userDataCollection.find().toArray();

  // 현재 로그인한 사용자의 이메일
  const currentUserEmail = session?.user?.email;

  // 현재 로그인한 사용자와 일치하는 사용자 정보 찾기
  const currentUserData = allUsers.find(user => user.email === currentUserEmail);

  // 사용자 정보가 존재하는지 여부 확인
  const isExist = !!currentUserData;

  return { session, isExist, userdata: currentUserData };
}