'use client'

import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WithId, Document } from "mongodb"
import { useRouter } from "next/navigation";
import styled from "styled-components"

let ViewCount = styled.span`
    display : none;
    transition : 0.3;
`

let SongContainerBox = styled.div`
    width: 100%;
    border : 1px solid #D2D2D2;
    border-radius : 10px;
    padding : 10px;
    margin : auto;
    margin-top : 10px;
    cursor : pointer;
    text-align : center;
    align-items : center;
    transition : all 0.3s;

    &:hover{
        padding: 15px;
        font-size : 18px;

        ${ViewCount} {
            display : block;
        }
    }
`


export default function PopularSong ({topTrackItem, number} : {topTrackItem : WithId<Document>, number :number}){
    const router = useRouter();

    let songTitle = ((topTrackItem.title.replace('.mp3','')).split('/')[1])



    return(
        <SongContainerBox className="row" onClick={()=>{
            router.push('/album/' + topTrackItem.title)
        }}>
            <div className="col-9" style={{textAlign:'left'}}>
                <span style={{fontSize:'18px'}}>{number + 1}</span>
                &nbsp;&nbsp;{songTitle}&nbsp;&nbsp;
                <ViewCount style={{textAlign:'left', color:'navy',fontSize:'14px'}}>
                    누적 조회수 : {topTrackItem.currentViews}
                </ViewCount>
            </div>

            <div className="col-3" 
                style={{
                    color: topTrackItem.increaseViews > 10 ?
                    '#CC0000' :
                    topTrackItem.increaseViews > 0 ? 
                    '#FF9900':
                    'black'
                }}>
                <FontAwesomeIcon icon={faUpLong} />
                &nbsp;{topTrackItem.increaseViews}
            </div>

        </SongContainerBox>
    )
}