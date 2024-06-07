import { useSession } from "next-auth/react";
import { SignOutBtn, SignInBtn } from "./SiginTools/SignBtns";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export default function Navbar(){
  
  let session = useSession();
  let router = useRouter();

  return(
    <div style={{width:'100%', padding:'20px', background:'grey'}}>
      <span 
        style={{cursor : 'pointer'}}
        onClick={()=>{router.push('/')}}
      >
        메이뿡스토리
      </span>
      <span> </span>
      <span style={{cursor:'pointer'}} onClick={()=>{router.push('/mypage')}}>
        마이페이지
      </span>
      <span> </span>
      {
        session.data !== undefined && !session.data?
        <SignInBtn />:
        <span>
          <SignOutBtn />
        </span>
      }
    </div>
  )
}

