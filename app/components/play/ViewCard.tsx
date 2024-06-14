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

    useEffect(()=>{
        topTrack.map(tt => {
            if(tt.title === nowPlayingAudio){
                setPlayinAudioViews(tt)
            }
    
            return null
        })
    },[topTrack])

    if(!playingAudioViews) {
        return (
            <CardBox >
                <p className="m-0 fs-3">아직 기록이 집계되지 않은 노래입니다</p>
            </CardBox>
        )
    }

    let totalView = playingAudioViews.currentViews
    let yesterdayView = playingAudioViews.previousViews
    let increaseView = playingAudioViews.increaseViews

    let firstBoxWidth = yesterdayView / totalView * 100
    let secondBoxWidth = increaseView / totalView * 100

    return (
        <CardBox >
            토탈
            <div style={{width : '100%', background:'aqua'}}>
                {totalView}
            </div>
            어제 대비 조회수 증가량
            <div style={{width:'100%',  display:'flex'}}>
                <div style={{width : firstBoxWidth + '%', background:'aqua'}}>
                    {yesterdayView}
                </div>
                <div style={{width : secondBoxWidth + '%', background:'aquamarine'}}>
                    {increaseView}
                </div>
            </div>
        </CardBox>
    )

}