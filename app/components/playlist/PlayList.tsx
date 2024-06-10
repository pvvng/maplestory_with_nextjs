'use client';

import React, { useState, useEffect } from 'react';
import { Document, WithId } from 'mongodb';
import SongHeartBtn from '../heartbtn/SongHeartBtn';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

interface PropsType {
  userdata: WithId<Document> | undefined,
  albumArr: string[],
  decodedParams?: { album: string, title: string }
}

let BlurredBackground = styled.div<{image : string}> `
  position: relative;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(27, 74, 85, 0.5); /* 디폴트 배경 색상 */
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    filter: blur(60px);
    z-index: 1;
  }

    img {
        max-width : 360px;
        position: relative;
        z-index: 2;
    }

    p {
        position: relative;
        z-index: 2;
        color : white;
    }
`

let ListContainer = styled.div`
    padding : 20px;
    border-radius : 10px;
    border : 1px solid #D2D2D2;
    background : white;
    margin-bottom : 10px;
    color: black;
    width : 100%;
    margin-left :auto;
    margin-right:auto;
    transition : all 0.5s;

    &:hover{
        background:black;
        color :white;
    }

`

export default function PlayList({ userdata, albumArr, decodedParams }: PropsType) {
  const router = useRouter();
  const [htmlPlaylist, setHtmlPlaylist] = useState<string[]>([]);
  const [userIcon, setUserIcon] = useState<string>('')
  const [username, setUserName] = useState<string>('')

  useEffect(()=>{
    if (userdata !== undefined){
      setUserIcon(userdata.image);
      setUserName(userdata.name)
    }
  },[userdata])

  useEffect(() => {
    // userdata, decodedParams 업데이트 될때마다 새롭게 변경
    let newPlaylist: string[] = [];
    if (userdata) {
      // 유저 데이터에서 불러온 플레이리스트를 새로운 배열에 복사
      const parsedPlaylist: string[] = JSON.parse(userdata.playlist);
      newPlaylist = [...parsedPlaylist];
    }

    // if (decodedParams !== undefined) {
    //   // decodedParams가 주어진 경우 해당 곡을 플레이리스트에서 필터링하여 제거
    //   newPlaylist = newPlaylist.filter((e: string) => e + '.mp3' !== decodedParams.title);
    // }

    // 새로운 플레이리스트를 상태에 반영
    setHtmlPlaylist(newPlaylist);
  }, [userdata, decodedParams]);

  if (htmlPlaylist.length === 0 && decodedParams === undefined) {
    return <p>플레이리스트가 비어있습니다.</p>
  }

  return (
    <div style={{alignItems:'center'}}>
      <div>
        <BlurredBackground className='mb-4' image = {userIcon}>
          <div className="row"  style={{alignItems:'center'}}>
              <div className="col-3 text-start">
                  <img style={{background:'#eee'}} src={userIcon} alt={'user-icon'} width={'100%'}/>
              </div>
              <div className="col-9">
                  <p className="m-0">{username}의</p>
                  <p className="fs-3 fw-bold" style={{fontSize:'18px'}}>플레이리스트</p>
              </div>
          </div>
        </BlurredBackground>

      </div>
      {
        htmlPlaylist.map((pl: string, i: number) => {
          // 현재 재생 중인 음악 폰트 색 변경
          let playBGColor = '';
          let playTextColor = '';
          if(decodedParams !== undefined ){
            if(decodedParams.title === (pl) + '.mp3'){
              playBGColor = 'black';
              playTextColor = 'white';
            }
          }
          return(
          <ListContainer className='row' style={{width:'100%', background: playBGColor, color: playTextColor}} key={i}>
            <span
              className='col-9'
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                let text = (e.target as HTMLSpanElement).textContent || "";
                router.push('/mypage/' + albumArr[i] + '/' + text + '.mp3');
              }}>{pl}</span>
              <div className='col-3' style={{textAlign:'right'}}>
                <SongHeartBtn userdata={userdata} componet={pl} />
              </div>
          </ListContainer>
        )})
      }
    </div>
  );
};