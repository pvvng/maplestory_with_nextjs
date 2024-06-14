'use client'

import { WithId, Document } from "mongodb"
import { useRouter } from "next/navigation";
import styled from "styled-components"

let SongContainerBox = styled.div`
    width: 100%;
    border : 1px solid #D2D2D2;
    border-radius : 10px;
    padding : 20px;
    margin : auto;
    margin-top : 10px;
    cursor : pointer;
    text-align : center;
`

export default function PopularSong ({topTrackItem, number} : {topTrackItem : WithId<Document>, number :number}){
    const router = useRouter();

    let songTitle = ((topTrackItem.title.replace('.mp3','')).split('/')[1])

    return(
        <SongContainerBox className="row" onClick={()=>{
            router.push('/album/' + topTrackItem.title)
        }}>
            <div className="col-4" style={{textAlign:'left'}}><span>{number + 1} : </span>{songTitle}</div>
            <div className="col-4">누적 : {topTrackItem.currentViews}</div>
            <div className="col-4">상승 : {topTrackItem.increaseViews}</div>
        </SongContainerBox>
    )
}