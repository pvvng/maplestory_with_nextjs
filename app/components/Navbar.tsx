'use client'

import styled from "styled-components";
import { SignInBtn, SignOutBtn } from "./SiginTools/SignBtns";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

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

export default function Navbar({session} :{session :Session | null}){

  let router = useRouter();

  return(
    <div style={{width:'100%'}}>
      <NavbarContainer>
        <LeftAlignedLink
          role="link"
          aria-label="Go to mainpage"
          style={{cursor : 'pointer'}}
          onClick={()=>{router.push('/')}}
        >
          <img src='/maplestory-icon.png' width={'50px'} alt="Storify" />
        </LeftAlignedLink>

        {/* <div style={{textAlign:'right'}}> */}
          <span className="fs-5 fw-bold" style={{cursor:'pointer'}} onClick={()=>{router.push('/mypage')}}>
            &nbsp; 마이페이지 &nbsp;
          </span>

          {
            !session?
            <SignInBtn />:
            <SignOutBtn />
          }
        {/* </div> */}
      </NavbarContainer>
    </div>
  )
}

