import axios from "axios";

export const handleViews = async (title :string) => {
  try {
      const response = await axios.post('/api/update/views', 
        { view : 1 , title : title }
      );
      if(response.status !== 200){
        throw new Error('서버 상태 오류');
      }
    } catch (error) {
      console.log('조회수 업데이트 중 오류 발생');
    }
}