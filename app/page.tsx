'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAlbums } from "./funcions/fetchAlbums";
import { useQuery } from "react-query";

export default function Home() {

  let router = useRouter();

  // input 참조
  const inputRef = useRef<HTMLInputElement>(null);
  // input value 저장하기
  const valueRef = useRef<string>('');
  // 받아온 앨범 명 (오브젝트 형태) 저장하기

  // input vlaue를 valueRef에 저장
  const saveValue = () => {
    if (inputRef.current) {
      valueRef.current = inputRef.current.value;
    }
  };

  // json 파일에 저장된 앨범 명 받아오기
  const { data: albums, isLoading, isError } = useQuery('albumList', () => fetchAlbums());

  if(isLoading) return <h1>로딩중임 기달</h1>
  if(isError) return <h1>에러남;; 우짜냐</h1>

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="앨범 검색" />
      <button onClick={()=> {
        // 검색어 저장 함수
        saveValue();

        if(valueRef.current !== ''){
          // 페이지 라우팅
          router.push('/album/' + valueRef.current);
        }else{
          // 예외처리
          alert('검색어를 입력해야징!!');
        }

      }}>검색</button>
    </div>
  );
}



