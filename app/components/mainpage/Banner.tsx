'use client'

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PropsType {
  bannerContainer : BannerItem[]
}

interface BannerItem {
  album: string;
  des: string;
  url: string;
}

let BannerBox = styled.div`
  width : 100%;
  margin-left :auto;
  margin-right :auto;
  margin-top: 20px;
  padding : 30px;
  border-radius : 20px;
  background :white;
  border : 0.5px solid #D2D2D2;
`

let InnerBox = styled.div`
  margin-top :auto;
  margin-bottom :auto;
  cursor :pointer;

  &:hover > button {
    opacity: 1;
    visibility: visible;
  }
`

let GoBtn = styled.button`
  float :right;
  transition :all 0.5s;
  border : none;
  font-size : 14px;

  &:hover{
    background :#CC0000;
  }
`

let SlideBtn = styled.button<{color :string}>`
  border:none;
  background : none;
  font-size : 10px;
  color : ${props => props.color};
`

export default function Banner({bannerContainer} :PropsType){

  let router = useRouter();

  let [bannerNum, setBannerNum] = useState(0);
  let [slideBtnColor, setSlideBtnColor] = useState<string[]>([]);

  useEffect(()=>{
    let timer = setTimeout(()=>{
      if(bannerNum !== bannerContainer.length - 1){
        setBannerNum(pre => pre + 1);
      }else{
        setBannerNum(0)
      }
    }, 10000)
    return () => clearTimeout(timer)
  },[bannerNum]);

  useEffect(()=>{
    let temp = new Array(bannerContainer.length).fill('grey');
    temp[bannerNum] = '#CC0000';
    setSlideBtnColor([...temp]);
  },[bannerNum])

  return(
    <BannerBox>
      <div className='row'>
        <InnerBox className="col-6" style={{textAlign:'center'}}>
          <Image 
            style={{maxWidth:'360px', width:'100%', height:'auto'}} 
            src={bannerContainer[bannerNum].url} 
            alt={bannerContainer[bannerNum].album} 
            width={360} 
            height={360} 
            loading='lazy'
            placeholder = 'blur'
            blurDataURL='/replace-img.png'
          />
        </InnerBox>
        <InnerBox className="col-6">
          <div style={{marginTop:'auto', marginBottom:'auto'}}>
            <p className='fs-4 fw-bold'>{bannerContainer[bannerNum].album}</p>
            <p style={{fontSize:'14px'}}>{bannerContainer[bannerNum].des}</p>
          </div>
          <GoBtn className='btn btn-secondary' onClick={()=>{
            router.push('/album/' + bannerContainer[bannerNum].album)
          }}>
          <FontAwesomeIcon icon={faPlay} /> &nbsp;
            감상하러 가기
          </GoBtn>
        </InnerBox>
      </div>
      <div className='mt-2' style={{textAlign:'center'}}>
        {
          bannerContainer.map((bc :BannerItem, i:number) => 
          <SlideBtn key={i} aria-label='next-slide' title='next-slide' color={slideBtnColor[i]} onClick={()=>{
            setBannerNum(i)
          }}>
            <FontAwesomeIcon icon={faCircle} />
          </SlideBtn>
        )
        }
      </div>
      <div style={{clear:'both'}}></div>
    </BannerBox>
  )
}