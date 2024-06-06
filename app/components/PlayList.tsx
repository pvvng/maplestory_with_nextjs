'use client'

import { Document, WithId } from "mongodb"
import SongHeartBtn from "./SongHeartBtn"

interface PropsType {
  userdata :WithId<Document> | undefined
}

export default function PlayList ({userdata} :PropsType){

  console.log(userdata)

  if(userdata!==undefined){
    let playlist = JSON.parse(userdata.playlist)

    if(playlist.length === 0) return <h2>플레이리스트가 비었다궁!!</h2>

    return(
      playlist.map((pl :string, i :number) => {
        return(
          <div key={i}>
            <span>{pl}</span>
          </div>
        )
      })
    )
  }
}