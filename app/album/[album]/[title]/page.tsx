'use client';

import { fetchAudio } from "@/app/funcions/fetchAWS";
import { useQuery } from "react-query";
import { GetHowlAudio } from "@/app/components/GetHowlAudio";
import Album from "@/app/components/Album";

export default function Songs(props: any) {

  // url 프로퍼티
  const params = props.params;

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
        <h4>{title}</h4>
        <h4>{decodedParams.album}</h4>
        <GetHowlAudio audio = {audio} album={decodedParams.album} title={title} />
        <Album decodedParams = {decodedParams.album} title={title} />
      </div>
    );
  }

}