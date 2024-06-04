'use client'

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  let router = useRouter();

  // input 참조
  const inputRef = useRef<HTMLInputElement>(null);
  // input value 저장하기
  const valueRef = useRef<string>('');

  // input vlaue를 valueRef에 저장
  const saveValue = () => {
    if (inputRef.current) {
      valueRef.current = inputRef.current.value;
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="앨범 검색" />
      <button onClick={()=> {
        saveValue();
        // 페이지 라우팅
        router.push('/album/' + valueRef.current);
      }}>검색</button>
    </div>
  );
}



