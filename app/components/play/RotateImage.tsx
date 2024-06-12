import styled, { keyframes, css } from "styled-components"

interface PropsType {
  imgUrl: ImgUrlType;
  isPlaying :boolean;
  duration :number;
}

interface ImgUrlType {
  [key: string]: string,
}

// 회전 애니메이션 정의
let rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// 스타일드 이미지 컴포넌트 정의
let RotateContainer = styled(({ isRotating, ...rest }: { isRotating: boolean } & React.ImgHTMLAttributes<HTMLImageElement>) => <img {...rest} />)`
  border-radius: 1000px;
  overflow: hidden;
  ${({ isRotating }) => isRotating && css`
    animation: ${rotateAnimation} 30s linear infinite;
  `} /* 회전 애니메이션 적용 */
`

let TurnTableContainer = styled.div`
  position : relative;
  width : 80%;
  margin-left : auto;
  margin-right : auto;
  max-width : 360px;
  border : 1px solid #D2D2D2;
  border-radius : 1000px;
`
let TurnArmImage = styled.img<{isRotating : boolean}>`
  width : 80%;
  position : absolute;
  right : 0;
  z-index : 10;
  transition : all 0.8s;
  /* 기준점을 오른쪽 가장자리로 설정 */
  transform-origin: right top;
  /* 45도 회전 */
  transform: ${({isRotating}) => (isRotating ? 'rotate(0deg)' : 'rotate(-31deg)')};
`

let InnerHole = styled.div`
  background : white;
  padding : 10%;
  border : 1px solid #D2D2D2;
  border-radius : 1000px;
  position : absolute; 
  top: 40%; 
  right: 38%;
`

export default function RotateImage({imgUrl, isPlaying, duration} :PropsType){

  return(
    <div style={{overflow:'hidden'}}>
      <TurnTableContainer>
        <TurnArmImage isRotating={isPlaying && duration > 0} src="/톤암.png"/>
        <RotateContainer isRotating={isPlaying && duration > 0} src = {imgUrl.url} alt={imgUrl.key} width = '100%' />
        <InnerHole></InnerHole>
      </TurnTableContainer>
    </div>
  )
}