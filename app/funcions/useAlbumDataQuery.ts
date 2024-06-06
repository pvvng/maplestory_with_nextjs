// 일반 앨범 오토플레이 설정하는 커스텀 훅

import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchFolder } from './fetchAWS';

export const useAudioEffect = (folder: any, title :any, nextAudioRef :any) => {
  useEffect(() => {
    // folder에 대한 useEffect 내용 작성
    
    if(folder !== undefined){
      let nowPlay :number = -1;
      folder.map ((d :{[key:string]:string}, i:number) => {
          if(d.Key.includes(title)){
              nowPlay = i
          }
      })
      let nextplay = nowPlay + 1
      if(nextplay >= folder.length){
          nextplay = 0;
      }
      let pointRemove = (folder[nextplay].Key).substring(0, (folder[nextplay].Key).lastIndexOf("."))
      let next = pointRemove.slice((pointRemove).indexOf("/") + 1)
      nextAudioRef.current = next;
    }
  }, [folder]);
};

export const useAudioQuery = (album: string) => {
  // 현재 재생 중인 음원이 위치한 폴더 useQuery로 불러오기
  const { data: folder, isLoading, isError } = useQuery(['getFolder'], () =>
    fetchFolder(album)
  );

  return { folder, isLoading, isError };
};