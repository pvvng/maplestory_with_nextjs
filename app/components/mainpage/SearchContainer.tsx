'use client'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRef } from "react";
import styled from "styled-components";

interface PropsType {
  router :AppRouterInstance,
}

let SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius : 10px;


  &:focus{
    outline: none; /* 기본 포커스 효과 제거 */
  }
`

let SearchBtn = styled.button`
  width:30%;
  right : 0;
  height: 40px;
  position : absolute;
  border-top-right-radius : 10px;
  border-bottom-right-radius : 10px;
  background : #6C757D;
  color : white;
  border : 1px solid #6C757D;

  &:hover{
    background : #CC0000;
    border : 1px solid #CC0000;
  }
`

export default function SearchContainer({router} :PropsType){

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

  return(
    <div style={{marginTop : '20px', position:'relative'}}>
      <SearchInput ref={inputRef} type="text" placeholder="앨범 검색" />
        <SearchBtn onClick={()=> {
          // 검색어 저장 함수
          saveValue();
      
          if(valueRef.current !== ''){
            // 페이지 라우팅
            router.push('/album/' + valueRef.current);
          }else{
            // 예외처리
            alert('검색어를 입력하세요.');
          }
      }}><FontAwesomeIcon icon={faMagnifyingGlass} /> 검색</SearchBtn>
    </div>
  )

}