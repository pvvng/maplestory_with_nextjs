import { connectDB } from "@/util/database";
import getDBuserdata from "../funcions/getDBuserdata";
import PlayList from "../components/playlist/PlayList";

export default async function MyPage(){

  const { session, isExist, userdata } = await getDBuserdata()

  if(userdata !== undefined){
    let userPlaylist = JSON.parse(userdata.playlist);
    let albumArr :string[] = await checkDependency(userPlaylist)

    if(!session) return <h1>로그인하라궁궁!!!</h1>

    if(session && albumArr !== undefined){
      return <PlayList userdata={userdata} albumArr={albumArr} />
    }
  }
}

export async function checkDependency(playlist :string[]){
  const db = (await connectDB).db('maple-bgm');
  
  // Promise 배열 생성
  const promises = playlist.map(async (up:string) => {
    const result = await db.collection('dependency').findOne({fileName : `${up}.mp3`});
    if(result !== null){
      return result.folderName;
    }
  });

  // Promise 배열을 병렬로 실행하고 결과를 기다림
  const folderNames = await Promise.all(promises);

  // 결과 반환
  return folderNames.filter(Boolean); // null이 아닌 값들만 필터링하여 반환
}