'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { fetchImages } from "../../funcions/fetch/fetchImages";
import Banner from "./Banner";
import SearchContainer from "./SearchContainer";
import { faPlane, faCouch, faFire } from "@fortawesome/free-solid-svg-icons";
import ThemeComponet from "./ThemeComponent";
import Popular from "./Popular";
import MiniMypage from "./MiniMypage";
import { Document, WithId } from "mongodb";

interface UserDataType {
  userdata : WithId<Document> | undefined,
  albumArr : string[]
}

export default function MainPage ({userdata, albumArr} :UserDataType){
  
  let router = useRouter();

  // 이미지 경로 aws에서 가져오기
  const { data :image, isLoading , isError  } = useQuery( ['image'], () => fetchImages())

  if(isLoading) return <h1 style={{textAlign:'center'}}>로딩 중입니다.</h1>
  if(isError) return <h1 style={{textAlign:'center'}}>에러가 발생했습니다.</h1>

  return(
    <div className="container">
      <Banner bannerContainer={bannerContainer} />

      <hr/>
      <div className="row">
        <div className="col-lg-4">
          {/* 검색 */}
          <SearchContainer router={router} todayAlbums={todayAlbums} />
          {/* 플레이리스트 */}
          <MiniMypage userdata={userdata} albumArr={albumArr} />

        </div>
        {/* 테마별 앨범 */}

        <div className="col-lg-8">
          <ThemeComponet themeAlbums={themeAlbums} image={image} />
        </div>
      </div>
    </div>
  )
}

  // db에서 오늘의 앨범 출력해서 가져오기
  let todayAlbums = {album : ['루디브리엄', '엘나스' , '블랙헤븐', '니할사막']}

  let themeAlbums = [
    // 최대 12개
    {
      theme :'# 추억 여행',
      album : ['시스템', '메이플 아일랜드', '리스항구','헤네시스', '커닝 시티', '엘리니아','오르비스'],
      icon : faPlane
    },
    {
      theme :'# 잔잔한',
      album : ['엘리니아', '설원의 음유시인', '에레브','시간의 신전', '메이플 아일랜드'],
      icon : faCouch
    },
    {
      theme :'# 이유없이 신나는',
      album : ['루디브리엄','지구방위본부', '무릉도원', '커닝 시티', '오르비스',],
      icon : faFire
    }
  ]


  // banner
  let bannerContainer = [
    { 
      album : '엔젤릭버스터', 
      des : ' 메이플 스토리의 아이돌, 엔젤릭버스터의 화려한 컴백! 🌟',
      url : 'https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/%EC%9D%B4%EB%AF%B8%EC%A7%80/%EC%97%94%EC%A0%A4%EB%A6%AD%EB%B2%84%EC%8A%A4%ED%84%B0.png'
    },
    { 
      album : '모험가 스토리', 
      des : '메이플 스토리의 주인공, 모험가. 노래로 듣는 그들의 이야기. 🍁',
      url : "https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/이미지/모험가 스토리.png"
    },
    { 
      album : '설원의 음유시인', 
      des : '설원의 눈보라에 흩날려 사라진 이야기 속으로 들어갈 준비가 되셨나요?',
      url : 'https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/이미지/설원의 음유시인.png'
    }
  ]