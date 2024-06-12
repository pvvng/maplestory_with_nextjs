import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setAutoPlayStatus, store } from '../../../store';
import { faArrowsRotate, faPause, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

let SlideBtn = styled.button.withConfig({
    shouldForwardProp: props => !['move'].includes(props)
})<{move :number}>`
    width : 50%;
    background : none;
    background : black;
    color : white;
    transform : translateX(${props => props.move}%);
    transition: all 1s;
    border-radius : 1000px;
`

let SlideBtnContainer = styled.div`
    background : #eee;
    border-radius : 1000px;
    max-width : 160px;
    margin : auto;
    margin-top : 20px;
`

/* 슬라이드 애니메이션 재생 버튼 컴포넌트 */

interface SlidePlayBtnType {
    playBtnMovement : number,
    setPlayBtnMovement :Dispatch<SetStateAction<number>>,
    isPlaying : boolean,
    setIsPlaying : Dispatch<SetStateAction<boolean>>
}

export function SlidePlayBtn({playBtnMovement,setPlayBtnMovement, isPlaying, setIsPlaying}:SlidePlayBtnType){
    return(
        <SlideBtnContainer>
            <SlideBtn move={playBtnMovement}  title="music-play-button" aria-label="music-play-button" onClick={()=>{
                if(playBtnMovement === -50){
                    setPlayBtnMovement(50);
                    setIsPlaying(true)
                }else{
                    setPlayBtnMovement(-50);
                    setIsPlaying(false)
                }
            }}>
                {    
                    !isPlaying ?
                    <FontAwesomeIcon icon={faPlay} />:
                    <FontAwesomeIcon icon={faPause} />
                }
            </SlideBtn>
        </SlideBtnContainer>
    )

}

/* 슬라이드 애니메이션 오토플레이 버튼 컴포넌트 */

interface SlideAutoPlayBtnType {
    isAutoPlay :MutableRefObject<boolean>,
    autoBtnMovement :number,
    setAutoBtnMovement :Dispatch<SetStateAction<number>>
}

export function SlideAutoPlayBtn({isAutoPlay, autoBtnMovement,setAutoBtnMovement} :SlideAutoPlayBtnType){
    let dispatch = useDispatch();

    // 오토플레이 상태 전환 함수
    const handleClick = (status :boolean) => {
        // useRef로 생성된 ref 객체의 current 값을 변경합니다.
        isAutoPlay.current = status;
    };

    return(
        <SlideBtnContainer>
            <SlideBtn move={autoBtnMovement} title="music-autoplay-button" aria-label="music-autoplay-button" onClick={()=>{
                if(autoBtnMovement === 50){
                    // 클릭시 오토플레이 종료, store에 오토플레이 상태 저장
                    setAutoBtnMovement(-50);
                    handleClick(false);
                    dispatch(setAutoPlayStatus(false));
                }else{
                    // 클릭시 오토플레이 시작, store에 오토플레이 상태 저장
                    setAutoBtnMovement(50);
                    handleClick(true);
                    dispatch(setAutoPlayStatus(true));
                }
            }}>
                {
                    isAutoPlay.current?
                    <span>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </span>:
                    <span>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                }
            </SlideBtn>
        </SlideBtnContainer>
    )
}