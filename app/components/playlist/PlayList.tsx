'use client';

import React, { useState, useEffect } from 'react';
import { Document, WithId } from 'mongodb';
import SongHeartBtn from '../heartbtn/SongHeartBtn';
import { useRouter } from 'next/navigation';

interface PropsType {
  userdata: WithId<Document> | undefined,
  albumArr: string[],
  decodedParams?: { album: string, title: string }
}

export default function PlayList({ userdata, albumArr, decodedParams }: PropsType) {
  const router = useRouter();
  const [htmlPlaylist, setHtmlPlaylist] = useState<string[]>([]);
  
  useEffect(() => {
    // userdata, decodedParams 업데이트 될때마다 새롭게 변경
    let newPlaylist: string[] = [];
    if (userdata) {
      // 유저 데이터에서 불러온 플레이리스트를 새로운 배열에 복사
      const parsedPlaylist: string[] = JSON.parse(userdata.playlist);
      newPlaylist = [...parsedPlaylist];
    }

    if (decodedParams !== undefined) {
      // decodedParams가 주어진 경우 해당 곡을 플레이리스트에서 필터링하여 제거
      newPlaylist = newPlaylist.filter((e: string) => e + '.mp3' !== decodedParams.title);
    }

    // 새로운 플레이리스트를 상태에 반영
    setHtmlPlaylist(newPlaylist);
  }, [userdata, decodedParams]);

  if (htmlPlaylist.length === 0 && decodedParams === undefined) {
    return <h1 style={{textAlign:'center'}}>플레이리스트가 비어있습니다.</h1>
  }

  return (
    <div>
      {
        htmlPlaylist.map((pl: string, i: number) => (
          <div key={i}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                let text = (e.target as HTMLSpanElement).textContent || "";
                router.push('/mypage/' + albumArr[i] + '/' + text + '.mp3');
              }}>{pl}</span>
            <SongHeartBtn userdata={userdata} componet={pl} />
          </div>
        ))
      }
    </div>
  );
};