import { faVolumeHigh, faVolumeLow, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

let StyledRangeInput = styled.input`
    outline: none;
    -webkit-appearance: none;
    width: 100%;
    outline: none;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 10px;
    background : none;

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 10px;
        background: black; /* 웹킷 브라우저용 슬라이더 배경 색상 */
        border-radius: 10px;
        border : 0.5px solid
    }

    /* thumb 커스텀 */
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 9px;
        border-radius: 100%;
        background: white;
        cursor: pointer;
    }

    /* 클릭 시 그림자 효과 추가 */
    &::-webkit-slider-thumb:active {
        box-shadow: 0px 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    &::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
    }
`

let HiddenLabel = styled.label`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`

interface VolumeInputType {
    volume :number,
    setVolume :Dispatch<SetStateAction<number>>
}

export default function VolumeInput({volume, setVolume} :VolumeInputType){
    return(
        <div style={{width:'100%',}}>
            <div style={{textAlign:'left'}}>
                {
                    volume <= 0.01?
                    <FontAwesomeIcon icon={faVolumeXmark} />:
                    volume <= 0.5 ?
                    <FontAwesomeIcon icon={faVolumeLow} />:
                    <FontAwesomeIcon icon={faVolumeHigh} />
                }
                <span>&nbsp;{parseInt((volume * 100).toString())}</span>
            </div>

            <HiddenLabel htmlFor="volume-control">Volume Control</HiddenLabel>
            <StyledRangeInput id="volume-control" type='range' min="1" max="100" defaultValue="50" style={{background :'black'}} onChange={(e)=>{
                let nowVolume :number= parseInt(e.target.value)
                setVolume(nowVolume/100);
            }}/>
        </div>
    )
}