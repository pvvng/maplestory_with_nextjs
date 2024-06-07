'use client'

import axios from "axios";
import { Document, WithId } from "mongodb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FolderType {
  ChecksumAlgorithm: string[]; 
  ETag: string; 
  Key: string; 
  LastModified: string; 
  Size: number; 
  StorageClass: string; 
};

interface PropsType{
  folder : any,
  userdata : WithId<Document> | undefined,
  i :number
}

// 하트 버튼 컴포넌트, 클릭시 유저 플레이리스트에 해당 곡 추가됨
// props 설명 : folder (useQuery로 받아온 앨범 정보) 
// userdata (현재 로그인 한 유저 정보)
// i 클릭한 부분의 인덱스 번호

export default function AlbumHeartBtn({folder, userdata, i} :PropsType){

  let router = useRouter();

  let userPlaylist :string[] = [];
  let folderKey :string[] = [];

  if(userdata !== undefined){
      userPlaylist = JSON.parse(userdata.playlist);
  }

  let heartEmoji = [ '🖤', '❤️' ] ;
  let [lengthArr, setLengthArr] = useState([-1]);

  useEffect(()=>{
    if (folder !== undefined && userdata !== undefined){
        // 현재 앨범에 있는 노래 이름만 저장하기
        folder.map ((f :FolderType) => {
            let temp = ((f.Key).split('/').pop())?.split('.')[0] || '';
            folderKey.push(temp);
        })
        let tempArr :number[] = new Array(folder.length).fill(0);
        // 현재 앨범과 유저 플레이리스트 안에 있는 앨범 비교해서
        // 플레이리스트에 있다면 하트 빨갛게 만들기
        userPlaylist.map((up :string) => {
            folderKey.map((f :string, i :number) => {
                if(up === f){
                    tempArr[i] = 1;
                }
            })
        })
        setLengthArr([...tempArr]);
    }
  },[folder])

  if(userdata !== undefined){
    return(
      <span 
        style={{cursor : 'cell'}}
        onClick={(e)=>{
            // 클릭하면 클릭한 부분 +1 시키기
            let temp = [...lengthArr];
            temp[i] = temp[i] + 1;
            setLengthArr([...temp]);
  
            // 현재 클릭한 부분(하트)의 형제 요소 중 노래 이름 저장하기
            const target = e.target as HTMLElement;
            let clickSong = target.previousSibling?.textContent || '';
  
            // 클릭한 횟수에 따라 플레이리스트 저장 or 삭제 달라지게
            // 클릭한 횟수에 따라 하트 색 변경
            if (lengthArr[i] % 2 === 0){
                userPlaylist.push(clickSong);
                userdata.playlist = JSON.stringify(userPlaylist);
            }else{
                let playlist = userPlaylist.filter(e => e !== clickSong);
                userPlaylist = [...playlist];
                userdata.playlist = JSON.stringify(userPlaylist);
            }
            // 서버로 데이터 전송
            axios.post('/api/post/playlist', userdata);

            // 하트가 제대로 안바꼈을수도 있으니까 soft refresh
            router.refresh();
        }}
        >
        &nbsp; {heartEmoji[lengthArr[i] % 2]}
      </span>
    )
  }

}