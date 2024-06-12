'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import styled from "styled-components";

interface PropsType {
    router :AppRouterInstance,
    todayAlbums :{album :string[]},
}
  

let GoPtag = styled.p`
  &:hover{
    color : #CC0000;
  }
`

export default function ArccordionContainer({router, todayAlbums} : PropsType){
    return(
      <Accordion className="mt-2" defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <p className="m-0">뭘 검색해야 할지 모르겠다면?</p>
            </Accordion.Header>
            <Accordion.Body >
                <p className="m-0">메이플 스토리 세계관 안의 다양한 지역을 검색하세요!</p>
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
    )
}