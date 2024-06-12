'use client'

import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { fetchFolder } from "@/app/funcions/fetch/fetchAWS";
import { Document, WithId } from "mongodb";
import AlbumHeartBtn from "../heartbtn/AlbumHeartBtn";
import { useEffect, useState } from "react";
import { fetchImages } from "@/app/funcions/fetch/fetchImages";
import styled from "styled-components";

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


let BlurredBackground = styled.div.withConfig({
    shouldForwardProp: props => !['image'].includes(props)
})<{image : string}>`
  position: relative;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(27, 74, 85, 0.5); /* 디폴트 배경 색상 */
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    filter: blur(60px);
    z-index: 1;
  }

    img {
        max-width : 360px;
        position: relative;
        z-index: 2;
    }

    p {
        position: relative;
        z-index: 2;
        color : white;
    }
`

let CardContainer = styled.div`
    align-items : center;
`

let ListContainer = styled.div`
    padding : 20px;
    border-radius : 10px;
    border : 1px solid #D2D2D2;
    background : white;
    margin-bottom : 10px;
    color: black;
    width : 100%;
    margin-left :auto;
    margin-right:auto;
    transition : all 0.5s;

    &:hover{
        background:black;
        color :white;
    }

`

export default function Album({decodedParams, title, userdata} :PropsType){

    let router = useRouter();

    let [imgUrl, setImgUrl] = useState<{[key :string] :string}>({});

      // 이미지 경로 aws에서 가져오기
    const { data :image, isLoading:imageLoading , isError:imageError  } = useQuery( ['image'], () => fetchImages())

    // 이미지 설정
    useEffect(()=>{
        if(image !== undefined){
            image.images.map((img:{[key :string] :string}) => {
                if(img.key.includes(decodedParams)){
                    setImgUrl(img);
                }
            })
        }
    },[image])

    // aws에서 폴더 (앨범) 데이터 받아오기
    const { data :folder , isLoading :folderLoading, isError :folderError } = useQuery(['getFolder', decodedParams], () => fetchFolder(decodedParams));

    if(folderLoading || imageLoading) return <h2 style={{textAlign:'center'}}>로딩 중 입니다.</h2>
    if(folderError || imageError) return <h2 style={{textAlign:'center'}}>에러가 발생했습니다.</h2>

    return(
        <div>
            {
                folder !== undefined && folder.length !== 0?
                <CardContainer className="p-md-5 mt-3">

                    <div>
                        <BlurredBackground image = {imgUrl.url}>
                            <div className="row"  style={{alignItems:'center'}}>
                                <div className="col-3 text-start">
                                    <img src={imgUrl.url}  style={{background:'#eee'}} alt={imgUrl.key} width={'100%'}/>
                                </div>
                                <div className="col-9">
                                    <p className="m-0">앨범</p>
                                    <p className="fs-3 fw-bold" style={{fontSize:'18px'}}>{decodedParams}</p>
                                </div>
                            </div>
                        </BlurredBackground>

                    </div>

                    <p className="mt-4 fw-bolder"># 제목</p>
                    {
                        folder.map( (f :S3Object, i:number) => {
                            let albumName :string = (f.Key.split('.')[0].split('/')[1]);
                            // 재생중인 음원은 배제
                            let playBGColor = '';
                            let playTextColor = '';
                            if(albumName === title){
                                playBGColor = 'black';
                                playTextColor = 'white';
                            }
                            return (
                                <ListContainer className="row" style={{background:playBGColor, color:playTextColor}} key={i}>
                                    <span
                                        className="col-9"
                                        style={{cursor:'pointer', }} 
                                        onClick={()=>{
                                            router.push('/album/' + f.Key);
                                        }}>
                                        {albumName}
                                    </span>
                                    <div className="col-3" style={{textAlign:'right'}}>
                                        <AlbumHeartBtn folder={folder} userdata={userdata} i={i} />
                                    </div>
                                </ListContainer>
                            )
                        })
                    }
                </CardContainer>:
                <p>검색 결과</p>
            }
        </div>
    )
}