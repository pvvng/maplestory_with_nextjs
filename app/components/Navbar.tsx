
import styled from "styled-components";
import Link from "next/link";
import { SignInBtn, SignOutBtn } from "./SiginTools/SignBtns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



let NavbarContainer = styled.div`
  width:100%;
  padding:20px;
  background: black;
  color :white;
  align-items :center;
`

export default function Navbar(){

  let session = useSession()

  let router = useRouter()

  return(
    <NavbarContainer className="row">
      <a
        className="col-6"
        style={{cursor : 'pointer'}}
        onClick={()=>{router.push('/')}}
      >
        <img src='/maplestory-icon.png' width={'50px'} />
      </a>

      <div className="col-6" style={{textAlign:'right'}}>
        <span className="fs-5 fw-bold" style={{cursor:'pointer'}} onClick={()=>{router.push('/mypage')}}>
          &nbsp; 마이페이지 &nbsp;
        </span>

        {
          !session.data?
          <SignInBtn />:
          <SignOutBtn />
        }
      </div>
    </NavbarContainer>
  )
}

