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
let RotateContainer = styled.img.withConfig({
  shouldForwardProp: props => !['isRotating'].includes(props)
})<{isRotating: boolean}>`
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

// props isRotating이 실제 DOM으로 전달되면서 오류 발생하는것을 방지
let TurnArmImage = styled.img.withConfig({
  // shouldForwardProp 설정을 활용해 isRotatinf이 DOM으로 전달 안되게 하기
  // prop가 isRotating인지 확인하고 아니라면 true 반환
  shouldForwardProp: (props) => !['isRotating'].includes(props),
})<{isRotating: boolean}>`
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
        <TurnArmImage isRotating={isPlaying && duration > 0} src="/톤암.png" alt="톤암 이미지"/>
        <RotateContainer isRotating={isPlaying && duration > 0} src = {imgUrl.url} alt={imgUrl.key} width = '100%' />
        <InnerHole></InnerHole>
      </TurnTableContainer>
    </div>
  )
}