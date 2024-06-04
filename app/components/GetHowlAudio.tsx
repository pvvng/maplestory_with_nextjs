import { Howl } from 'howler';
import { useEffect, useState } from 'react';

// howler js로 howl 객체 생성하는 컴포넌트
export function GetHowlAudio (audio :any){

    // audio 변수 초기화
    audio = audio.audio;

    // 오디오 url 상태
    let [howlAudio, setHowlAudio] = useState<Howl | null>(null);
    // 볼륨 감시 상태
    let [volume, setVolume] = useState(0.5);
    // 음원 길이
    let [duration, setDuration] = useState(0);
    // 타이머 상태
    let [isPlaying, setIsPlaying] = useState(false);
    let [storedDuration, setStoredDuration] = useState(0);

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

    useEffect(()=>{
        if(isPlaying && howlAudio){
            howlAudio.play()
        }else{
            howlAudio?.pause()
        }
    },[isPlaying, howlAudio])

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
        let timer = setTimeout(()=>{
            if(isPlaying){
                // 1초마다 남은 음원 길이 감소
                setDuration(duration - 1);
                // 남은 음원 길이가 0 이하일때
                console.log(duration)
                if (parseInt(duration.toFixed(0)) === 1){
                    console.log('end')
                    clearTimeout(timer);
                    // 남은 음원 길이 기존 음원 길이로 재설정
                    setDuration(storedDuration)
                }
            }
        },1000)
        return () => clearTimeout(timer);
    },[duration])

    return(
        <div>
            {
                !isPlaying ?
                <button onClick={()=>{setIsPlaying(true)}}>재생</button>:
                <button onClick={()=>{setIsPlaying(false)}}>일시정지</button>
            }
            <div>
                <span>볼륨 조절&nbsp;</span>
                <input type='range' min="1" max="100" defaultValue="50" onChange={(e)=>{
                    let nowVolume :number= parseInt(e.target.value)
                    setVolume(nowVolume/100)
                }}/>
            </div>
            {/* <div>
                <input type='range' readOnly/>
            </div> */}
            {
                duration === 0?
                <p>로딩중임여</p>:
                <p>남은 오디오 길이 : {duration.toFixed(0)}</p>
            }
        </div>
    )
}


