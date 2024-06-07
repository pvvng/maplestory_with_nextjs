'use client';

import { fetchAudio } from "@/app/funcions/fetch/fetchAWS";
import { useQuery } from "react-query";
import { GetHowlAudio } from "@/app/components/play/GetHowlAudio";
import Album from "@/app/components/play/Album";
import { Document, WithId } from "mongodb";
import SongHeartBtn from "@/app/components/heartbtn/SongHeartBtn";
import PlayList from "../playlist/PlayList";

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

  // 예외처리
  if (isLoading) return <h2>로딩중뿌잉</h2>;
  if (isError) return <div>Error loading audio</div>;

  if(audio !== undefined){

    return (
      <div>
        <h2>Song</h2>
        <span style={{fontWeight:'bold'}}>{title}</span>
        <SongHeartBtn userdata={userdata} />
        <h4>{decodedParams.album}</h4>
        {
          !myPageComponent?
          <div>
            <GetHowlAudio audio = {audio} album={decodedParams.album} title={title} />
            <Album decodedParams = {decodedParams.album} title={title} userdata={userdata} />
          </div>
          :
          <div>
            <GetHowlAudio audio={audio} album={decodedParams.album} title={title} albumArr={albumArr} userdata={userdata}  />
            <PlayList userdata={userdata} albumArr={albumArr} decodedParams = {decodedParams}/>
          </div>
        }
      </div>
    );
  }
  
}