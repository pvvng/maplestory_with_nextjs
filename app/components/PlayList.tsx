'use client';

import React, { useState, useEffect } from 'react';
import { Document, WithId } from 'mongodb';
import axios from 'axios';
import { useQuery } from 'react-query';
import SongHeartBtn from './SongHeartBtn';
import { getFolderForFile } from '../funcions/getFolderForFile';
// import { getFolderForFile } from '../utils/folderUtils';

interface PropsType {
  userdata: WithId<Document> | undefined;
}

export default function PlayList ({ userdata } :PropsType){
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [clickedAudio, setClickedAudio] = useState<string>('not yet');
  const [showAudioPlayer, setShowAudioPlayer] = useState<number[]>([])

  const { data: folderName, isLoading, isError } = useQuery(
    ['folderName', clickedAudio],
    () => getFolderForFile(clickedAudio + '.mp3'),
  );

  useEffect(() => {
    if (userdata) {
      // 유저 데이터에서 불러온 플레이리스트 상태에 저장
      const parsedPlaylist = JSON.parse(userdata.playlist);
      setPlaylist(parsedPlaylist);
    }
  }, [userdata]);

  useEffect(()=>{
    if(playlist.length !== 0){
      let tempArr = new Array(playlist.length).fill(0)
      setShowAudioPlayer([...tempArr])
    }
  },[playlist])


  if (playlist.length === 0) return <h2>플레이리스트가 비었다궁!!</h2>;

  return (
    <div>
      {playlist.map((pl: string, i: number) => (
        <div key={i}>
          <div style={{ transition: 'all 0.5s', width: '100%', height: showAudioPlayer[i] + 'px', background: 'skyblue' }}></div>
          <span 
          style={{cursor : 'pointer'}}
          onClick={(e)=>{
            let text = (e.target as HTMLSpanElement).textContent || ""
            let temp = new Array(playlist.length).fill(0)
            temp[i] = 200;
            setShowAudioPlayer(temp)
            setClickedAudio(text)
          }}>{pl}</span>
          <SongHeartBtn userdata={userdata} componet={pl} />
        </div>
      ))}
      {/* <p>{folderName}</p> */}
    </div>
  );
};

