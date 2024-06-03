'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch('/api/getAudio');
        const data = await response.json()
        setAudioUrl(data.audioUrl)
      } catch (error) {
        console.error('오디오를 가져오는 동안 오류가 발생했습니다:', error);
      }
    };

    fetchAudio();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 함

  console.log(audioUrl === '')
  if(audioUrl !== ''){
    return (
      <div>
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

}