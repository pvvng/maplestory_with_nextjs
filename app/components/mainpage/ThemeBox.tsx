'use client'

import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {useState } from "react"
import styled from "styled-components"

interface PropsType {
  themeAlbums : {theme :string, album :string[], icon: IconDefinition},
  image : {images : ImageDataType[]}
}

interface ImageDataType {
  [key :string]:string
}

let ContainerBox = styled.div`
  width: 400%;
  border-top : 1px solid grey;
  padding : 20px;
`
let TripBtn = styled.button`
  border : none;
  background :none;
  &:hover{
    color : #CC0000;
  }
`

let MovingBox = styled.div.withConfig({
  shouldForwardProp : props => !['move'].includes(props)
})<{move :number}>`
  transition : all 1s;
  transform : translateX(${props => props.move}00%)
`

let OpacityImgContainer = styled.div`
  border-radius : 1000px;
  background : black;
  &:hover{
    img {
      transition : all 0.5s;
      opacity : 0.5;
    }
  }
`
export default function ThemeBox({themeAlbums, image} :PropsType){

  let router = useRouter();
  // 캐러셀 이동 측정 변수
  let [moveCounter, setMoveCounter] = useState(0);

  return(
    <div style={{overflow:'hidden'}}>
      <ContainerBox >
        <span className="fw-bold" style={{fontSize:'18px'}}>{themeAlbums.theme}</span>
        <TripBtn className="mx-2" onClick={()=>{
          let arrLength = themeAlbums.album.length;
          if (moveCounter >= 0 && moveCounter < arrLength - 3) {
            setMoveCounter(prev => prev + 1);
          } else if (moveCounter === arrLength - 3) {
            setMoveCounter(0); // 3이 되면 0으로 초기화
          } else {
            setMoveCounter(prev => prev - 1);
          }

        }}>Click! <FontAwesomeIcon icon={themeAlbums.icon} /></TripBtn>
        <div className="row mt-3" >
          {
            themeAlbums.album.map((ta :string, i:number) => {
              let albumImage = '';
              let imageAlt = '';
              image.images.map((img : {[key :string] :string}) => {
                if (img.key.includes(ta)){
                  albumImage = (img.url)
                  imageAlt = img.key
                }
              })
              return (
                <MovingBox move={-(moveCounter)} key={i} className="col-1" 
                  onClick={()=>{ router.push('/album/' + ta) }}
                >
                  <OpacityImgContainer >
                    <Image
                      style={{cursor:'pointer', borderRadius:'1000px', maxWidth:'100%', height:'auto'}}
                      src={albumImage} 
                      alt ={imageAlt} 
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  </OpacityImgContainer>
                  <p className="mt-2" style={{textAlign:'center'}}>{ta}</p>
                </MovingBox>
              )
            })
          }
        </div>
      </ContainerBox>
    </div>

  )
}