// 일반 앨범 오토플레이 설정하는 커스텀 훅

import { MutableRefObject, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchFolder } from '../fetch/fetchAWS';

interface FolderDataType {
  ChecksumAlgorithm: string[];
  ETag: string;
  Key: string;
  LastModified: string;
  Size: number;
  StorageClass: string;
}

export const useAudioEffect = (folder: FolderDataType[]|undefined, title :string, nextAudioRef :MutableRefObject<string>) => {
  useEffect(() => {
    if(folder !== undefined){
      let nowPlay :number = -1;
      // 받은 폴더 데이터 가공
      folder.map ((d , i:number) => {
          if(d.Key.includes(title)){
              nowPlay = i
          }
      })
      let nextplay = nowPlay + 1
      if(nextplay >= folder.length){
          nextplay = 0;
      }

      let next = ('/album/' + folder[nextplay].Key)
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