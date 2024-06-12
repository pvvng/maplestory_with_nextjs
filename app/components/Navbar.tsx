
import styled from "styled-components";
import { SignInBtn, SignOutBtn } from "./SiginTools/SignBtns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

let NavbarContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center;
`;

let LeftAlignedLink = styled.a`
  cursor: pointer;
  text-align: left;
`;

export default function Navbar(){

  let session = useSession()

  let router = useRouter()

  return(
    <div style={{width:'100%'}}>
      <NavbarContainer>
        <LeftAlignedLink
          style={{cursor : 'pointer'}}
          onClick={()=>{router.push('/')}}
        >
          <img src='/maplestory-icon.png' width={'50px'} />
        </LeftAlignedLink>

        {/* <div style={{textAlign:'right'}}> */}
          <span className="fs-5 fw-bold" style={{cursor:'pointer'}} onClick={()=>{router.push('/mypage')}}>
            &nbsp; 마이페이지 &nbsp;
          </span>

          {
            !session.data?
            <SignInBtn />:
            <SignOutBtn />
          }
        {/* </div> */}
      </NavbarContainer>
    </div>
  )
}

