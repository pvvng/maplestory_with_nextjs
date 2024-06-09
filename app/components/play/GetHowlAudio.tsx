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
                        router.push('/album/' + album + '/' + nextAudioRef.current + '.mp3');
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
        }else{
            howlAudio?.pause();
        }

        // 현재 음원이 재생 중이라면 타이머 감소시키기
        let timer = setInterval(()=>{
            if(isPlaying){
                // 1초마다 남은 음원 길이 감소
                setDuration(pre => pre - 1);
                // 남은 음원 길이가 0 이하일때
                if (parseInt(duration.toFixed(0)) === 1){
                    console.log('end')
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

    return(
        <div>
            <RotateImage imgUrl={imgUrl} isPlaying={isPlaying} duration={duration} />
            <div className='p-5' style={{textAlign:'center'}}>
                {
                    !isPlaying ?
                    <button className='btn btn-primary mx-2' onClick={()=>{setIsPlaying(true)}}>재생</button>:
                    <button className='btn btn-secondary mx-2' onClick={()=>{setIsPlaying(false)}}>일시정지</button>
                }
                {
                    isAutoPlay.current?
                    <button className='btn btn-secondary' onClick={()=>{
                        // 클릭시 오토플레이 종료, store에 오토플레이 상태 저장
                        handleClick(false);
                        dispatch(setAutoPlayStatus(false));
                    }}>오토플레이 종료</button>:
                    <button className='btn btn-primary' onClick={()=>{
                        // 클릭시 오토플레이 시작, store에 오토플레이 상태 저장
                        handleClick(true);
                        dispatch(setAutoPlayStatus(true));
                    }}>오토플레이</button>
                }
                <div className='mt-5'>
                    <span>볼륨 조절&nbsp;</span>
                    <input type='range' min="1" max="100" defaultValue="50" style={{background :'black'}} onChange={(e)=>{
                        let nowVolume :number= parseInt(e.target.value)
                        setVolume(nowVolume/100);
                    }}/>
                </div>
                
                {/* progress bar */}
                <div style={{width:'200px', height:'20px', marginTop:'30px', background:'#eee', marginLeft:'auto', marginRight:'auto'}}>
                    <div style={{width: remainDuration + '%', height:'100%', background:'#0075FF'}}></div>
                </div>

                {
                    duration > 0?
                    <p>남은 오디오 : {duration.toFixed(0)} 초</p>:
                    <div className="spinner-border mt-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }

            </div>
        </div>
    )
}