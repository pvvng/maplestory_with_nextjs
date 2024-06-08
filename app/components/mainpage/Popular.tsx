'use client'

import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import {useState } from "react"
import styled from "styled-components"

interface PropsType {
  popularAlbums : {theme :string, album :string[], icon: IconDefinition},
  image : any
}

let ContainerBox = styled.div`
  width: 400%;
  border-top : 1px solid grey;
  padding : 20px;
`
let TripBtn = styled.button`
  font-size : 18px;
  border : none;
  background :none;
  &:hover{
    color : #CC0000;
  }
`

let MovingBox = styled.div<{move :number}>`
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
export default function Popular({popularAlbums, image} :PropsType){

  let router = useRouter();
  // 캐러셀 이동 측정 변수
  let [moveCounter, setMoveCounter] = useState(0);

  return(
    <div style={{overflow:'hidden'}}>
      <ContainerBox >
        <span className="fs-4 fw-bold">{popularAlbums.theme}</span>
        <TripBtn className="mx-2" onClick={()=>{
          let arrLength = popularAlbums.album.length;
          if (moveCounter >= 0 && moveCounter < arrLength - 3) {
            setMoveCounter(prev => prev + 1);
          } else if (moveCounter === arrLength - 3) {
            setMoveCounter(0); // 3이 되면 0으로 초기화
          } else {
            setMoveCounter(prev => prev - 1);
          }

        }}>Click! <FontAwesomeIcon icon={popularAlbums.icon} /></TripBtn>
        <div className="row mt-3" >
          {
            popularAlbums.album.map((ta :string, i:number) => {
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
                    <img
                      style={{cursor:'pointer', borderRadius:'1000px'}}
                      src={albumImage} 
                      alt ={imageAlt} 
                      width={'100%'} 
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