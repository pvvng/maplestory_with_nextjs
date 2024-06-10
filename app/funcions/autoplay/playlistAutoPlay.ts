// 유저 플레이리스트 자동재생 다음 곡 설정하는 함수

export function playlistAutoPlay(userdata :any, title :any, albumArr :any, nextAudioRef :any){
  if(userdata!== undefined){
    let next :string = ''
    const parsedPlaylist = JSON.parse(userdata.playlist)
    parsedPlaylist.map((up:string, i:number) => {
      if (title === up){
        if(i === parsedPlaylist.length - 1){
          next = '/mypage/' + albumArr[0] + '/' + parsedPlaylist[0] + '.mp3'
        }else{
          next = '/mypage/' + albumArr[i+1] + '/' + parsedPlaylist[i+1] + '.mp3'
        }
      }
    })
    nextAudioRef.current = next
  }
}
