import { Howl } from 'howler';
import { useEffect, useState } from 'react';

// howler js로 howl 객체 생성하는 컴포넌트
export function GetHowlAudio (audio :any){

    audio = audio.audio

    let [howlAudio, setHowlAudio] = useState<Howl | null>(null);
    let [volume, setVolume] = useState(0.5)

    useEffect(()=>{
        const sound :Howl = new Howl({
            src: [audio.audioUrl],
            format: ['mp3'],
            volume: 0.5
        });

        setHowlAudio(sound)
    },[])

    useEffect(() => {
        if(howlAudio){
            if (volume === 1) {
                howlAudio.mute();
            } else {
                howlAudio.volume(volume);
            }
        }
      }, [volume]);

    return(
        <div>
            <button onClick={()=>playAudio(howlAudio)}>재생</button>
            <button onClick={()=>pauseAudio(howlAudio)}>중지</button>
            <div>
                <input type='range' min="1" max="100" defaultValue="50" onChange={(e)=>{
                    let nowVolume :number = e.target.value /100;
                    setVolume((nowVolume)/100)
                }}/>
            </div>
        </div>
    )
}

// howl 객체 조절 함수1 (플레이)
export const playAudio = (howlAudio :Howl | null) => {
    if (howlAudio) {
        howlAudio.play();
    }
};

// howl 객체 조절 함수2 (종료)
export const pauseAudio = (howlAudio :Howl | null) => {
    if (howlAudio) {
        howlAudio.pause();
    }
};


