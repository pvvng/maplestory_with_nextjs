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

  if(!session) return <h1 style={{textAlign:'center'}}>로그인 후 이용가능한 페이지입니다.</h1>

  return <DetailSong params={params} userdata={userdata} />

}