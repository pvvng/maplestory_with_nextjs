import SiginForm from "@/app/components/SiginTools/SignForm";
import DetailSong from "@/app/components/play/DetailSong";
import getDBuserdata from "@/app/funcions/fetch/getDBuserdata";

interface ParamsType {
  album :string,
  title :string
}

interface PropsType {
  params : ParamsType;
  searchParams : {}
}

export default async function Songs(props :PropsType) {
  // url 프로퍼티
  const params :ParamsType = props.params;

  const { session, isExist, userdata } = await getDBuserdata();

  // 로그인은 했으나, 회원가입이 되지 않은 경우
  if(session && !isExist){
    return <SiginForm session={session} />
  }

  if(!session) return <h1 style={{textAlign:'center'}}>로그인 후 이용가능한 페이지입니다.</h1>

  return <DetailSong params={params} userdata={userdata} />

}