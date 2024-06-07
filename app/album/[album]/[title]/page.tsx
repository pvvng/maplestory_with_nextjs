import DetailSong from "@/app/components/play/DetailSong";
import getDBuserdata from "@/app/funcions/fetch/getDBuserdata";

interface ParamsType {
  album :string,
  title :string
}

export default async function Songs(props: any) {

  // url 프로퍼티
  const params :ParamsType = props.params;

  const { session, isExist, userdata } = await getDBuserdata();

  if(!session) return <h2>로그인하구 오셈ㅎ</h2>

  return <DetailSong params={params} userdata={userdata} />

}