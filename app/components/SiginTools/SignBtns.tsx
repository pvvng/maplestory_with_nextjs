'use client'

import { signIn, signOut } from "next-auth/react";

export function SignInBtn(){
  return(
    <button onClick={()=>{signIn()}}>로그인</button>
  )
}

export function SiginOutBtn(){
  return(
    <button onClick={()=>{signOut()}}>로그아웃</button>
  )
}
