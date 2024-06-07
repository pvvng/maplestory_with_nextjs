'use client'

import axios from "axios";
import { Document, WithId } from "mongodb";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PropsType{
  userdata : WithId<Document> | undefined,
  componet ?: string
}

// 하트 버튼 컴포넌트, 클릭시 유저 플레이리스트에 해당 곡 추가됨
// props 설명 
// userdata (현재 로그인 한 유저 정보)
// component SongHeartBtn 컴포넌트를 사용하고 있는 컴포넌트의 정보 (마이페이지 or 곡 페이지)

export default function SongHeartBtn({userdata, componet} :PropsType){

  let params = useParams();
  let router = useRouter();


  let [counter, setCounter] = useState(0);
  let heartEmoji = [ '🖤', '❤️' ] ;
  let [title, setTitle] = useState<string>('');
  let userPlaylist :string[] = [];

  if(userdata !== undefined){
    userPlaylist = JSON.parse(userdata.playlist);
  }

  // 만약 일반 곡 컴포넌트에서 이 컴포넌트 사용시 작동되는 훅
  useEffect(()=>{
    if (params !== null){
      if(componet === undefined && typeof params.title === 'string'){
        // 현재 곡 제목 디코딩
        let temp = decodeURIComponent(params.title);
        temp = temp.replaceAll('%20',' ');
        temp = temp.replace('.mp3','');
        setTitle(temp);
      }
    }
  },[counter])

  // 만약 마이페이지 컴포넌트에서 이 컴포넌트 사용시 작동되는 훅
  useEffect(()=>{
    if(componet !== '/not yet.mp3' && !(componet?.includes('undefined'))){
      if(typeof componet === 'string'){
        setTitle(componet)
      }
    }
  },[componet])

  // 현재 사용자의 플레이리스트에 해당 곡이 있으면 빨간 하트
  useEffect(()=>{
    if(userPlaylist !== undefined){
      userPlaylist.map ((up :string) => {
        if (up === title){
          setCounter(1);
        }
      })
    }
  },[title])

  if(userdata !== undefined && title !== ''){
    return(
      <span 
        style={{cursor : 'cell'}}
        onClick={(e)=>{
          setCounter(pre => pre + 1);

          if(counter % 2 === 0){
            userPlaylist.push(title);
          }else{
            let playlist = userPlaylist.filter(e => e !== title);
            userPlaylist = [...playlist];
          }
          userdata.playlist = JSON.stringify(userPlaylist);

          // 서버로 데이터 전송
          axios.post('/api/post/playlist', userdata);
          router.refresh();
        }}
        >
        &nbsp; {heartEmoji[counter % 2]}
      </span>
    )
  }
}