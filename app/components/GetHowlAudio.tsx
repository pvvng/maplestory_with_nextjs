import { Howl } from 'howler';
import { useEffect, useState } from 'react';

// howler js로 howl 객체 생성하는 컴포넌트
export function GetHowlAudio (audio :any){

    audio = audio.audio

    let [howlAudio, setHowlAudio] = useState<Howl | null>(null);

    useEffect(()=>{
        const sound :any = new Howl({
            src: [audio.audioUrl],
            format: ['mp3'],
        });

        setHowlAudio(sound)
    },[])

    return(
        <div>
            <button onClick={()=>playAudio(howlAudio)}>재생</button>
            <button onClick={()=>pauseAudio(howlAudio)}>중지</button>
        </div>
    )
}

// howl 객체 조절 함수1 (플레이)
export const playAudio = (howlAudio :any) => {
    if (howlAudio) {
        howlAudio.play();
    }
};

// howl 객체 조절 함수2 (종료)
export const pauseAudio = (howlAudio :any) => {
    if (howlAudio) {
        howlAudio.pause();
    }
};


