import { connectDB } from "@/util/database";
import PopularSong from "./PopularSong";

export default async function Chart (){

    const db = (await connectDB).db('maple-bgm')

    return(
        <div className="mt-4" style={{padding:'20px', borderRadius:'20px',border:'1px solid #D2D2D2'}}>
            <p className="fw-bold" style={{fontSize:'20px'}}>실시간 인기 차트</p>
            <PopularSong/>
        </div>
    )
}