'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { fetchImages } from "../../funcions/fetch/fetchImages";
import Banner from "./Banner";
import SearchContainer from "./SearchContainer";
import ThemeComponet from "./ThemeComponent";
import Popular from "./Popular";
import MiniMypage from "./MiniMypage";
import { Document, WithId } from "mongodb";
import axios from "axios";
import { bannerContainer, themeAlbums, todayAlbums } from "@/app/data/mainPageData";
import Footer from "../Footer";

interface UserDataType {
  userdata : WithId<Document> | undefined,
  albumArr : string[]
}

export default function MainPage ({userdata, albumArr} :UserDataType){
  
  let router = useRouter();

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
      <Footer />
    </div>
  )
}

