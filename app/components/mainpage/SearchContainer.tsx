'use client'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRef } from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import styled from "styled-components";

interface PropsType {
  router :AppRouterInstance,
  todayAlbums :{album :string[]},
}

let SearchInput = styled.input`
  width: 70%;
  height: 40px;
  padding: 10px;
  border: 2px solid #ccc;
  border-top-left-radius : 10px;
  border-bottom-left-radius : 10px;

  &:focus{
    outline: none; /* 기본 포커스 효과 제거 */
  }
`

let SearchBtn = styled.button`
  width:30%;
  height: 40px;
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

let GoPtag = styled.p`
  &:hover{
    color : #CC0000;
  }
`

export default function SearchContainer({router, todayAlbums} :PropsType){

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
    <div style={{marginTop : '20px'}}>
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

      <Accordion className="mt-2" defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p className="m-0">뭘 검색해야 할지 모르겠다면?</p>
          </Accordion.Header>
          <Accordion.Body >
            <p className="m-0">
              메이플 스토리 세계관 안의 다양한 지역을 검색하세요!
            </p>
            <p className="m-0">
              <strong>헤네시스</strong>, <strong>시간의 신전</strong> 등 다양한 지역을 베이스로 한 앨범이 존재합니다.
            </p>
            <p><strong>차원의 도서관</strong>, <strong>블랙헤븐</strong> 등 메이플 스토리 세계관과 연결되는 특별한 앨범이 있습니다.</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <p className="m-0">오늘의 추천 앨범</p>
          </Accordion.Header>
          <Accordion.Body >
            {
              todayAlbums.album.map((ta:string) => 
              <GoPtag key={ta} className="fw-bold" style={{cursor:'pointer'}} onClick={()=>{
                router.push('/album/' + ta);
              }}>{ta}</GoPtag>)
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )

}