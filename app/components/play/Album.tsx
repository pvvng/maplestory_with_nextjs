'use client'

import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { fetchFolder } from "@/app/funcions/fetch/fetchAWS";
import { Document, WithId } from "mongodb";
import AlbumHeartBtn from "../heartbtn/AlbumHeartBtn";
import { useEffect, useState } from "react";

// 앨범 정보를 받아오는 컴포넌트 
// decodedParams : 앨범명 (ex. 엔젤릭버스터) , title : 현재 곡 제목(song page에서만)

interface PropsType{
    decodedParams :string,
    title? :string,
    userdata? : WithId<Document> | undefined
}

interface S3Object {
    ChecksumAlgorithm: string[];
    ETag: string;
    Key: string;
    LastModified: string;
    Size: number;
    StorageClass: string;
};

export default function Album({decodedParams, title, userdata} :PropsType){

    let router = useRouter();

    // aws에서 폴더 (앨범) 데이터 받아오기
    const { data :folder , isLoading :folderLoading, isError :folderError } = useQuery(['getFolder', decodedParams], () => fetchFolder(decodedParams));

    if(folderLoading) return <h2>로딩중임</h2>
    if(folderError) return <h2>에러남;</h2>
    return(
        <div>
            {
                folder !== undefined && folder.length !== 0?
                <div>
                    <img />
                    <h2>{decodedParams}</h2>
                    {
                    folder.map( (f :S3Object, i:number) => {
                        let albumName :string = (f.Key.split('.')[0].split('/')[1]);
                        if(albumName === title){
                            return null
                        }
                        return (
                            <div key={i}>
                                <span  
                                    style={{cursor:'pointer'}} 
                                    onClick={()=>{
                                        router.push('/album/' + f.Key);
                                    }}>
                                    {albumName}
                                </span>
                                <AlbumHeartBtn folder={folder} userdata={userdata} i={i} />
                            </div>
                        )
                    })}
                </div>:
                <p>검색 결과</p>
            }
        </div>
    )
}

const fetchImages = async () => {
    try {
      const response = await fetch('/api/getImage');
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to fetch images', error);
    }
};