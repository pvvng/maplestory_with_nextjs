'use client'

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface PropsType {
  bannerAlbum :{album :string, des :string, url:string}
}

let BannerBox = styled.div`
  width : 100%;
  background : white;
  margin-left :auto;
  margin-right :auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding : 30px;
  border-radius : 20px;
  max-width : 1024px;
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
  opacity :0;
  transition :all 0.5s;
  border : none;

  &:hover{
    background :#FF6666;
  }
`

export default function Banner({bannerAlbum} :PropsType){

  let router = useRouter();

  return(
    <BannerBox>
      <div className='row'>
        <InnerBox className="col-6">
          <img src={bannerAlbum.url} alt={bannerAlbum.album} width={'100%'}  />
        </InnerBox>
        <InnerBox className="col-6">
          <p className='fs-2 fw-bold'>{bannerAlbum.album}</p>
          <p>{bannerAlbum.des}</p>
          <GoBtn className='btn btn-secondary' onClick={()=>{
            router.push('/album/' + bannerAlbum.album)
          }}>
          <FontAwesomeIcon icon={faPlay} /> &nbsp;
            감상하러 가기
          </GoBtn>
        </InnerBox>
      </div>
      <div style={{clear:'both'}}></div>
    </BannerBox>
  )
}