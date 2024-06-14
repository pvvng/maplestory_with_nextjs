import { RootState } from "@/app/providers/ReduxProvider"
import { WithId, Document } from "mongodb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components"

interface PropsType {
    decodedParams :{
        album: string;
        title: string;
    }
}

let CardBox = styled.div`
    border-radius : 20px;
    padding : 10px;
    margin : auto;
    margin-top :10px;
    align-items: center;
    border: 1px solid #D2D2D2;
`

export default function ViewCard({decodedParams} :PropsType){

    let topTrack = useSelector((state :RootState) => state.topTrack)
    let nowPlayingAudio = decodedParams.album + '/' + decodedParams.title;
    let [playingAudioViews, setPlayinAudioViews] = useState<WithId<Document> | null>(null);
    // 조회수 그래프 조절 상태
    let [viewCheckState, setViewCheckState] = useState([0,0,0,0]);

    useEffect(()=>{
        topTrack.map(tt => {
            if(tt.title === nowPlayingAudio){
                setPlayinAudioViews(tt)
            }
    
            return null
        })
    },[topTrack])
    

    // 노래 조회수 기록이 조회되지 않았을 경우 예외처리
    if(!playingAudioViews) {
        return (
            <CardBox >
                <p className="m-0 fs-4">아직 기록이 집계되지 않은 노래입니다</p>
            </CardBox>
        )
    }

    // 조회수 기록 예외처리 된 이후에 동작
    let totalView :number = playingAudioViews.currentViews
    let yesterdayView :number = playingAudioViews.previousViews
    let increaseView :number = playingAudioViews.increaseViews
    // 조회수 저장 어레이
    let viewArr = [yesterdayView, increaseView, totalView]

    // 그래프 길이 설정
    let firstBoxWidth = yesterdayView / totalView * 100
    let secondBoxWidth = increaseView / totalView * 100

    return (
        <CardBox >
            <p className="m-0 fs-4" style={{cursor:'pointer'}} onClick={()=>{
                setViewCheckState([firstBoxWidth, secondBoxWidth, 100, 1])
            }}>노래 조회수 확인하기</p>
            
            {
                ['어제 조회수',  '조회수 증가량 (24시간)', '누적 조회수'].map ((text :string, i :number) => {
                    return(
                        <div className="mt-2">
                            <p className="m-0" style={{textAlign:'left'}}>{text}</p>
                            <div style={{width:'100%', height:'20px', background:'black', borderRadius:'10px'}}>
                                <div style={{width : viewCheckState[i] + '%', height:'20px', background:'orange', borderRadius:'10px', transition: 'all 1s'}}>
                                    <span style={{opacity : viewCheckState[3]}}>{viewArr[i]}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </CardBox>
    )

}