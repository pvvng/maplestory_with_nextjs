// 유저 플레이리스트 자동재생 다음 곡 설정하는 함수

export function playlistAutoPlay(userdata :any, title :any, albumArr :any, nextAudioRef :any){
  if(userdata!== undefined){
    let newAlbumArr :string[] = []
    let next :string = ''
    const parsedPlaylist = JSON.parse(userdata.playlist)
    parsedPlaylist.map((up:string, i:number) => {
      if (title === up){
        newAlbumArr = insertAtIndex(albumArr as string[], i, 'playing')
      }
    })
    if(newAlbumArr !== undefined){
      newAlbumArr.map((naa:string, i:number) => {
        if(naa === 'playing'){
          if(i === newAlbumArr.length - 1){
            next = '/mypage/' + newAlbumArr[0] + '/' + parsedPlaylist[0] + '.mp3'
          }else{
            next = '/mypage/' + newAlbumArr[i+1] + '/' + parsedPlaylist[i+1] + '.mp3'
          }
        }
      })
    }
    console.log(next)

    nextAudioRef.current = next
  }
}

function insertAtIndex<T>(array: T[], index: number, element: T): T[] {
  const newArray = [...array]; // 원본 배열 복사
  newArray.splice(index, 0, element); // 인덱스 위치에 요소 삽입
  return newArray; // 변경된 배열 반환
}