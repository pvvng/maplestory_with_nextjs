'use client';

import { fetchAudio } from "@/app/funcions/fetch/fetchAWS";
import { useQuery } from "react-query";
import { GetHowlAudio } from "@/app/components/play/GetHowlAudio";
import Album from "@/app/components/play/Album";
import { Document, WithId } from "mongodb";
import SongHeartBtn from "@/app/components/heartbtn/SongHeartBtn";
import PlayList from "../playlist/PlayList";
import { useEffect, useState } from "react";
import { fetchImages } from "@/app/funcions/fetch/fetchImages";
import RotateImage from "./RotateImage";

interface PropsType {
  params : ParamsType,
  userdata :WithId<Document> | undefined,
  // 마이페이지에서 이 컴포넌트 불러올 시 작동되는 인자
  myPageComponent ?: boolean,
  // 플레이리스트 안의 노래가 종속된 폴더
  albumArr ?:string[]
}

interface ParamsType {
  album :string,
  title :string
}

export default function DetailSong({params, userdata, myPageComponent, albumArr = []} :PropsType){

  // params 디코딩
  const decodedParams = {
    album: decodeURIComponent(params.album),
    title: decodeURIComponent(params.title)
  };

  // 제목에 .mp3 떼기
  const title = decodedParams.title.substring(0, decodedParams.title.lastIndexOf("."));
  let fetchQuery :string = decodedParams.album + '/' + decodedParams.title

  // aws에서 음원 데이터 받아오기
  const { data:audio, isLoading, isError } = useQuery(
    ['audio', decodedParams.album, decodedParams.title],
    () => fetchAudio(fetchQuery)
  );

  let [imgUrl, setImgUrl] = useState<{[key :string] :string}>({});

  // 이미지 경로 aws에서 가져오기
  const { data :image, isLoading:imageLoading , isError:imageError  } = useQuery( ['image'], () => fetchImages())

  // 이미지 설정
  useEffect(()=>{
      if(image !== undefined){
          image.images.map((img:{[key :string] :string}) => {
              if(img.key.includes(decodedParams.album)){
                  setImgUrl(img);
              }
          })
      }
  },[image])

  // 예외처리
  if (isLoading  || imageLoading) return <h1 style={{textAlign:'center'}}>로딩 중 입니다.</h1>;
  if (isError || imageError) return <h1 style={{textAlign:'center'}}>에러가 발생했습니다.</h1>;

  if(audio !== undefined){
    //  노래 플레이 위치에 따라서 조건부 렌더링
    return (
      <div>
        <div className="row" style={{width : '100%', marginLeft:'auto', marginRight:'auto'}}>
          <div className="col-lg-6">
            <div className="p-md-5" style={{textAlign:'center'}}>
              {
                !myPageComponent?
                <GetHowlAudio audio = {audio} album={decodedParams.album} title={title} imgUrl={imgUrl} />:
                <GetHowlAudio audio={audio} album={decodedParams.album} title={title} albumArr={albumArr} userdata={userdata} imgUrl={imgUrl}  />
              }
            </div>
          </div>
          <div className="col-lg-6">
            {/* 앨범 리스트 상하정렬하는 div */}
            {/* <div style={{display:'flex', alignItems:'center', height:'100%'}}> */}
              {
                !myPageComponent?
                <Album decodedParams = {decodedParams.album} title={title} userdata={userdata} />:
                <PlayList userdata={userdata} albumArr={albumArr} decodedParams = {decodedParams}/>
              }
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
  
}