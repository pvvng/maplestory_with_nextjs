'use client'

import { useSelector } from "react-redux";
import PopularSong from "./PopularSong";
import { RootState } from "@/app/providers/ReduxProvider";

export default function Chart (){

    let topTrack = useSelector((state :RootState) => state.topTrack)

    return(
        <div className="mt-4" style={{padding:'20px', borderRadius:'20px',border:'1px solid #D2D2D2'}}>
            <p className="fw-bold" style={{fontSize:'20px'}}>인기 급상승</p>
            {
                topTrack.map((tt, i:number) => {
                    return <PopularSong key ={i} number={i} topTrackItem={tt}/>
                })
            }
            
        </div>
    )
}