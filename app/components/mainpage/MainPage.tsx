'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { fetchImages } from "../../funcions/fetch/fetchImages";
import Banner from "./Banner";
import SearchContainer from "./SearchContainer";
import ThemeComponet from "./ThemeComponent";
import MiniMypage from "./MiniMypage";
import { Document, WithId } from "mongodb";
import { bannerContainer, themeAlbums, todayAlbums } from "@/app/data/mainPageData";
import Footer from "../Footer";
import ArccordionContainer from "./Arccodian";
import Chart from "./Chart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTopTrackState } from "@/app/store";


interface UserDataType {
  userdata : WithId<Document> | undefined,
  albumArr : string[],
  topTrack : WithId<Document>[]
}

export default function MainPage ({userdata, albumArr, topTrack} :UserDataType){

  let router = useRouter();

  const dispatch = useDispatch();

  // 컴포넌트 마운트 시 인기 급상승 음악 어레이 데이터 store에 저장하기
  useEffect(()=>{
    dispatch(setTopTrackState(topTrack))
  },[])
  

  // 이미지 경로 aws에서 가져오기
  const { data :image, isLoading , isError  } = useQuery( ['image'], () => fetchImages())

  if(isLoading  ) return <h1 style={{textAlign:'center'}}>로딩 중입니다.</h1>
  if(isError ) return <h1 style={{textAlign:'center'}}>에러가 발생했습니다.</h1>

  return(
    <div>
      <div className="container">
        <Banner bannerContainer={bannerContainer} />

        <hr/>
        <div className="row">
          <div className="col-lg-4">
            {/* 검색 */}
            <SearchContainer router={router} />
            {/* 아코디언 */}
            <ArccordionContainer router={router} todayAlbums={todayAlbums} />
            {/* 플레이리스트 */}
            <MiniMypage userdata={userdata} albumArr={albumArr} />
          </div>
          
          {/* 테마별 앨범 */}
          <div className="col-lg-8">
            <Chart/>
            <ThemeComponet themeAlbums={themeAlbums} image={image} />
          </div>

        </div>
      </div>
      {/* 푸터 */}
      <Footer />
    </div>
  )
}

