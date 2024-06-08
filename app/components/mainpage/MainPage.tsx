'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAlbums } from "../../funcions/fetch/fetchAlbums";
import { useQuery } from "react-query";
import { fetchImages } from "../../funcions/fetch/fetchImages";
import Banner from "./Banner";
import FixedCard from "./FixedCard";
import styled from "styled-components";
import SearchContainer from "./SearchContainer";

export default function MainPage ({userdata} :any){
  
  let router = useRouter();

  // 이미지 경로 aws에서 가져오기
  const { data :image, isLoading , isError  } = useQuery( ['name'], () => fetchImages())
  // const { data :album, isLoading :isAlbum, isError :isAError } = useQuery(['album'], () => fetchAlbums())

  // db에서 오늘의 앨범 출력해서 가져오기
  let todayAlbums = {album : ['아쿠아리움','메이플스토리 M', '시간의 신전', '리프레']}

  // banner
  let bannerContainer = [
    { 
      album : '엔젤릭버스터', 
      des : ' 메이플 스토리의 아이돌, 엔젤릭버스터의 화려한 컴백! 🌟',
      url : 'https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/%EC%9D%B4%EB%AF%B8%EC%A7%80/%EC%97%94%EC%A0%A4%EB%A6%AD%EB%B2%84%EC%8A%A4%ED%84%B0.png'
    },
    { 
      album : '모험가 스토리', 
      des : '메이플 스토리의 주인공, 모험가. 그들의 이야기를 감상해봐요. 🍁',
      url : "https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/이미지/모험가 스토리.png"
    },
    { 
      album : '설원의 음유시인', 
      des : '설원의 눈보라에 흩날려 사라진 이야기 속으로 들어갈 준비가 되셨나요?',
      url : 'https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/이미지/설원의 음유시인.png'
    }
  ]

  if(isLoading) return <h1>로딩중임 기달</h1>
  if(isError) return <h1>에러남;; 우짜냐</h1>

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          {/* 검색 */}
          <SearchContainer router={router} todayAlbums={todayAlbums} />
        </div>
        <div className="col-lg-8">
            {/* 배너 */}
            <Banner bannerContainer={bannerContainer} />
        </div>
      </div>


      {/* 추천 앨범 */}
      {
        todayAlbums !== undefined ?
        <FixedCard todayAlbums = {todayAlbums} image={image} />
        :null
      }
        
    </div>
  )
}