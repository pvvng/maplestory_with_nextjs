import { Howl } from 'howler';
import {  useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../layout';
import { setAutoPlayStatus, store } from '../../store';
import { useAudioEffect, useAudioQuery } from '../../funcions/autoplay/useAlbumDataQuery';
import { WithId, Document } from 'mongodb';
import { playlistAutoPlay } from '../../funcions/autoplay/playlistAutoPlay';
import RotateImage from './RotateImage';
import styled from 'styled-components';
import { faArrowRight, faArrowsRotate, faPause, faPlay, faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AudioMetadata {
    AcceptRanges: string;
    ContentLength: number;
    ContentType: string;
    ETag: string;
    LastModified: string;
    Metadata: Record<string, any>;
    ServerSideEncryption: string;
}
  
interface AudioObject {
    audioUrl: string;
    metadata: AudioMetadata;
}

interface PropsType {
    audio : AudioObject,
    album : string,
    title : string,
    imgUrl : ImgUrlType,
    albumArr ?: string[],
    userdata ?: WithId<Document> | undefined
}

interface ImgUrlType {
    [key: string]: string;
}

// 볼륨 조절 input 커스텀
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

let AudioBox = styled.div`
    border-radius : 20px;
    padding : 10px;
    margin : auto;
    margin-top :10px;
    align-items: center;
    background : black;
    border: 1px solid #D2D2D2;
`

let SlideBtn = styled.button<{move :number}>`
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

// howler js로 howl 객체 생성하는 컴포넌트
export function GetHowlAudio ({audio, album, title, albumArr, userdata, imgUrl} :PropsType){

    let router = useRouter();
    let autoPlay = useSelector((state :RootState) => state.autoPlay)
    let dispatch = useDispatch();

    // 오디오 url 상태
    let [howlAudio, setHowlAudio] = useState<Howl | null>(null);
    // 볼륨 감시 상태
    let [volume, setVolume] = useState(0.5);
    // 음원 길이
    let [duration, setDuration] = useState(0);
    // 타이머 상태
    let [isPlaying, setIsPlaying] = useState(false);
    let [storedDuration, setStoredDuration] = useState(0);
    // progress bar 넓이
    let [remainDuration, setRemainDuration] = useState(0);
    // 다음 재생할 음원
    const nextAudioRef = useRef<string>('');
    // useRef로 오토플레이 상태 참조
    let isAutoPlay = useRef<boolean>(autoPlay);
    // 오토플레이 실행 버튼 애니메이션
    let [autoBtnMovement, setAutoBtnMovement] = useState(0);
    // 재생버튼 애니메이션
    let [playBtnMovement, setPlayBtnMovemonet] = useState(0);


    if(userdata !== undefined){
        // 유저의 플레이리스트인 경우의 자동재생 함수
        playlistAutoPlay(userdata, title, albumArr, nextAudioRef);
    }else{
        // 현재 음원이 위치한 folder 어레이 데이터 불러오기
        const {folder, isLoading, isError} = useAudioQuery(album);
        useAudioEffect(folder, title, nextAudioRef);
    }

    // 최초 마운트 시 실행
    useEffect(()=>{
        const sound :Howl = new Howl({
            // 객체 초기화
            src: [audio.audioUrl],
            format: ['mp3'],
            volume: 0.5,
            html5: true, // 모바일 기기에서 HTML5 Audio를 사용하도록 설정
            // howl 객체 로드 완료시 음원 길이 상태에 저장
            onload: () => {
                setDuration(sound.duration());
                setStoredDuration(sound.duration());
            },
            onend: () => {
                setIsPlaying(false);
                setDuration(sound.duration());
                if(isAutoPlay.current){
                    if(userdata !== undefined){
                        // 유저가 플레이리스트 재생 중일 경우 아래 경로로 라우팅
                        router.push(nextAudioRef.current)
                    }else{
                        // 유저가 일반 앨범 재생 중일 경우 아래 경로로 라우팅
                        router.push( nextAudioRef.current );
                    }
                }
            }
        });

        // howl 객체 상태에 저장
        setHowlAudio(sound);

        // 마운트 시 음원 재생
        setIsPlaying(true);

        // 컴포넌트 언마운트시 클리어
        return () => {
            sound.stop();
        };
    },[])

    // 볼륨 조절
    useEffect(() => {
        if(howlAudio){
            if (volume === 0.01) {
                howlAudio.mute(true);
            } else {
                howlAudio.mute(false);
                howlAudio.volume(volume);
            }
        }
    }, [volume]);

    useEffect(()=>{
        // 현재 상태가 재생중이라면 음원 플레이, 아니라면 음원 종료 
        if(isPlaying && howlAudio){
            howlAudio.play();
            setPlayBtnMovemonet(50);
        }else{
            howlAudio?.pause();
            setPlayBtnMovemonet(-50);
        }

        // 현재 음원이 재생 중이라면 타이머 감소시키기
        let timer = setInterval(()=>{
            if(isPlaying){
                // 1초마다 남은 음원 길이 감소
                setDuration(pre => pre - 1);
                // 남은 음원 길이가 0 이하일때
                if (parseInt(duration.toFixed(0)) === 1){
                    clearTimeout(timer);
                    // 남은 음원 길이 기존 음원 길이로 재설정
                    setDuration(storedDuration)
                }
            }
        },1000)
        return () => clearInterval(timer);

    },[isPlaying])

    // 0~100 까지 남은 음원 길이에 비례해서 progress bar의 width 설정
    useEffect(()=>{
        setRemainDuration(100 - ((duration/storedDuration)*100));
    },[duration])

    // 오토플레이 상태 전환 함수
    const handleClick = (status :boolean) => {
        // useRef로 생성된 ref 객체의 current 값을 변경합니다.
        isAutoPlay.current = status;
    };

    // 오토플레이 상태에 따라 슬라이드 버튼 상태 전환
    useEffect(()=>{
        if(!autoPlay){
            setAutoBtnMovement(-50);
        }else{
            setAutoBtnMovement(50);
        }
    },[autoPlay])

    return(
        <div className='mt-3'>
            {/* 상단 div box */}
            <AudioBox style={{width:'80%', color:'white'}}>
                {/* 노래 정보 */}
                <p className="fs-md-3 fw-bold m-0">{album}</p>
                {/* 세트메뉴임 */}
                <div>
                    <span className="fs-md-5"># {title}</span>
                    {/* <SongHeartBtn userdata={userdata} /> */}
                </div>
            </AudioBox>
            {/* 하단 div 박스 */}
            <AudioBox className='row' style={{width:'100%', background:'white'}}>
                {/* 재생시 돌아가는 앨범 커버 */}
                <div className='col-sm-6'>
                    <RotateImage imgUrl={imgUrl} isPlaying={isPlaying} duration={duration} />
                </div>

                {/* 기능들 */}
                <div className='col-sm-6'>
                    {/* 재생 */}
                    <SlideBtnContainer>
                        <SlideBtn move={playBtnMovement} onClick={()=>{
                            if(playBtnMovement === -50){
                                setPlayBtnMovemonet(50);
                                setIsPlaying(true)
                            }else{
                                setPlayBtnMovemonet(-50);
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
                    {/* 오토플레이 */}
                    <SlideBtnContainer>
                        <SlideBtn move={autoBtnMovement} onClick={()=>{
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

                    {/* volume & gage */}
                    <div className='p-3'>

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

                            <StyledRangeInput type='range' min="1" max="100" defaultValue="50" style={{background :'black'}} onChange={(e)=>{
                                let nowVolume :number= parseInt(e.target.value)
                                setVolume(nowVolume/100);
                            }}/>
                        </div>
                        {/* 남은 오디오 */}
                        <div style={{textAlign:'left'}}>
                            {
                                duration > 0?
                                <div>
                                    <div className='row'>
                                        <span className='col-6'>{duration.toFixed(0)}</span>
                                        <span className='col-6'  style={{textAlign:'right'}}>{storedDuration.toFixed(0)}</span>
                                    </div>
                                    {/* progress bar */}
                                    <div style={{width:'100%', height:'10px', background:'#eee', margin:'auto', borderRadius:'10px'}}>
                                        <div style={{width: remainDuration + '%', height:'100%', background:'black', borderRadius:'10px'}}></div>
                                    </div>
                                </div>
                                :
                                <div className="spinner-border mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </AudioBox>
        </div>
    )
}