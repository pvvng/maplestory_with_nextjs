'use client'

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchAlbums } from "../../funcions/fetch/fetchAlbums";
import { useQuery } from "react-query";
import { fetchImages } from "../../funcions/fetch/fetchImages";
import SearchBtn from "./SearchBtn";
import Banner from "./Banner";

export default function MainPage ({userdata} :any){
  
  let router = useRouter();



  // 이미지 경로 aws에서 가져오기
  const { data :image, isLoading , isError  } = useQuery( ['name'], () => fetchImages())
  // const { data :album, isLoading :isAlbum, isError :isAError } = useQuery(['album'], () => fetchAlbums())

  // db에서 오늘의 앨범 출력해서 가져오기
  let todayAlbums = {album : ['엔젤릭버스터', '메이플스토리 M', '설원의 음유시인', '루타비스', '시간의 신전', '시스템']}

  // banner
  let bannerAlbum = { 
    album : '엔젤릭버스터', 
    des : '엔젤릭버스터의 화려한 컴백! 🌟 메이플 스토리의 아이돌, 엔젤릭버스터가 새로운 앨범으로 돌아왔습니다. 독특한 매력과 감미로운 목소리가 담긴 최신 트랙을 지금 만나보세요! 🎶',
    url : 'https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/%EC%9D%B4%EB%AF%B8%EC%A7%80/%EC%97%94%EC%A0%A4%EB%A6%AD%EB%B2%84%EC%8A%A4%ED%84%B0.png'
  }

  if(isLoading) return <h1>로딩중임 기달</h1>
  if(isError) return <h1>에러남;; 우짜냐</h1>

  return(
    <div className="container">
      {/* 검색 */}
      <SearchBtn router={router} />
      {/* 배너 */}
      <Banner bannerAlbum={bannerAlbum} />
      {/* 추천 앨범 */}
      <h2>오늘의 추천 앨범</h2>
      <div className="row" style={{width:'100%', marginLeft:'auto', marginRight:'auto'}}>
        {
          // 오늘의 추천 앨범과 비교해서 일치하는 사진 데이터 집어넣기
          todayAlbums !== undefined?
          todayAlbums.album.map((a:string, i:number) => {
            let albumImage = '';
            let imageAlt = '';
            image.images.map((img : {[key :string] :string}) => {
              if (img.key.includes(a)){
                albumImage = (img.url)
                imageAlt = img.key
              }
            })
            return ( 
              <div className="card col-md-4 p-0"  key={i} >
                <div style={{width:'100%'}}>
                  <img className="card-img-top" src= {albumImage} alt ={imageAlt} width={'100%'} />
                </div>
                <div className="card-body">
                  <p
                    className="card-body"
                    onClick={()=>{router.push('/album/' + a)}}
                    style={{cursor :'pointer'}}  
                  >
                    {a}&nbsp;&nbsp;
                  </p>
                </div>
              </div>
            )
          }
        ): null
        
      }
      </div>
    </div>
  )
}