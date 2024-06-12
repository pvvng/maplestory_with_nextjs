import axios, { AxiosError } from "axios";

// 앨범명이 저장된 json 파일의 데이터를 받아오는 함수
export const fetchAlbums = async () => {
    try {
      const response = await axios.get('/api/getAlbum');
      return response.data; // 성공적으로 응답을 받은 경우
    } catch (error :any) {
      console.error('앨범 불러오는 중 에러가 발생했습니다:', error); // 오류가 발생한 경우
      if (error instanceof AxiosError){
        console.error('Axios 오류 :', error.response)
      }
      throw new Error('에러발생:', error)
    }
  };