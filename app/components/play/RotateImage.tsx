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
export default function RotateImage({imgUrl, isPlaying, duration} :PropsType){

  return(
    <div style={{width: '80%', marginLeft:'auto', marginRight:'auto', maxWidth:'360px', border:'1px solid #D2D2D2', borderRadius:'1000px'}}>
      <RotateContainer isRotating={isPlaying && duration > 0} src = {imgUrl.url} alt={imgUrl.key} width = '100%' />
    </div>
  )
}