'use client'

import { useSelector } from "react-redux";
import PopularSong from "./PopularSong";
import { RootState } from "@/app/providers/ReduxProvider";
import { useRouter } from "next/navigation";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

let GoBtn = styled.button`
  transition :all 0.5s;
  border : none;
  font-size : 14px;

  &:hover{
    background :#CC0000;
  }
`

export default function Chart (){

    let router = useRouter();
    let topTrack = useSelector((state :RootState) => state.topTrack);

    // 날짜 포맷함수
    function formatDate(){
        let now = new Date()
        let year = now.getFullYear();
        let month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        let day = now.getDate().toString().padStart(2, '0'); // 일자를 2자리 숫자로 맞춤
    
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    return(
        <div className="mt-4" style={{padding:'20px', borderRadius:'20px',border:'1px solid #D2D2D2'}}>
            <button aria-label="soft-refresh" style={{cursor:'pointer', float:'right'}} onClick={()=>{
                router.refresh();
            }}><FontAwesomeIcon icon={faArrowsRotate} /></button>
            <p className="fw-bold m-0" style={{fontSize:'20px'}}>
                🔥 인기 급상승&nbsp;
            </p>
            <span style={{color:'#666666', fontSize:'14px'}}>{formatDate()} 기준 </span>
            <span style={{color:'#666666', fontSize:'14px'}}>(매일 자정마다 초기화 됩니다)</span>
            {
                topTrack.map((tt, i:number) => {
                    return <PopularSong key ={i} number={i} topTrackItem={tt}/>
                })
            }
            <div style={{clear:'both'}}></div>
        </div>
    )
}