'use client'

import { useEffect, useState } from "react"
import styled from "styled-components"

let CardBackGround = styled.div`
  height: 1300px;
  margin-top: 40px;
  margin-bottom: 1600px;
  max-width : 1024px;
  margin-left :auto;
  margin-right :auto;
  background :white;
  border-radius : 20px;
`

let CardBox = styled.div`
  position: sticky;
  top: 40px;
  margin-top: 20px;


  img {
    display: block;
    margin: auto;
    max-width: 80%;
  }
`

interface PropsType {
  todayAlbums : {album :string[]},
  image : any
}

export default function FixedCard ({todayAlbums, image} :PropsType){

  return(
    <CardBackGround>
      <h2>오늘의 추천 앨범</h2>
      {
        todayAlbums.album.map((ta :string, i:number) => {
           let albumImage = '';
           let imageAlt = '';
           image.images.map((img : {[key :string] :string}) => {
             if (img.key.includes(ta)){
               albumImage = (img.url)
               imageAlt = img.key
             }
           })
          return (
            <CardBox key={i}>
              <div className="row">
                <div className="col-6">
                  <img 
                    src={albumImage} 
                    alt ={imageAlt} 
                    width={'100%'} 
                  />
                </div>
              </div>

            </CardBox>
          )
        })
      }
    </CardBackGround>
  )
}