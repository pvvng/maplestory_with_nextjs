'use client'

import axios from "axios";
import { Document, WithId } from "mongodb";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// interface FolderType {
//   ChecksumAlgorithm: string[]; 
//   ETag: string; 
//   Key: string; 
//   LastModified: string; 
//   Size: number; 
//   StorageClass: string; 
// };

interface PropsType{
  userdata : WithId<Document> | undefined,
  // i :number
}

// 하트 버튼 컴포넌트, 클릭시 유저 플레이리스트에 해당 곡 추가됨
// props 설명 : folder (useQuery로 받아온 앨범 정보) 
// userdata (현재 로그인 한 유저 정보)
// i 클릭한 부분의 인덱스 번호

export default function SongHeartBtn({userdata} :PropsType){

  let params = useParams();
  let router = useRouter();

  let [counter, setCounter] = useState(0);
  let heartEmoji = [ '🖤', '❤️' ] ;
  let [title, setTitle] = useState('');
  let userPlaylist :string[] = [];

  if(userdata !== undefined){
    userPlaylist = JSON.parse(userdata.playlist);
  }

  useEffect(()=>{
    if (params !== null){
      if(typeof params.title === 'string'){
        // 현재 곡 제목 디코딩
        let temp = decodeURIComponent(params.title);
        temp = temp.replaceAll('%20',' ');
        temp = temp.replace('.mp3','');
        setTitle(temp);
      }
    }
  },[counter])

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