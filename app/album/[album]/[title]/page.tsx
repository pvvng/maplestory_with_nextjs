import { SiginOutBtn, SignInBtn } from "@/app/components/SiginTools/SignBtns";
import DetailSong from "./DetailSong";
import getDBuserdata from "@/app/funcions/getDBuserdata";

interface ParamsType {
  album :string,
  title :string
}

export default async function Songs(props: any) {

  // url 프로퍼티
  const params :ParamsType = props.params;

  const { session, isExist, userdata } = await getDBuserdata();

  if(!session) return (
    <div>
      <SignInBtn />
      <h2>로그인하구 오셈ㅎ</h2>
    </div>
  )

  return(
    <div>
      <SiginOutBtn />
      <DetailSong params={params} userdata={userdata} />
    </div>
  )

}