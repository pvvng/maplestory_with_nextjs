import axios from "axios";

// 파일 이름을 파라미터로 넣으면 해당 파일의 폴더 이름을 검색하는 함수
export const getFolderForFile = async (fileName: string): Promise<string> => {
  try {
    const response = await axios.get(`/api/findFolder`, {
      params: { fileName },
    });
    return response.data.folderName;
  } catch (error) {
    console.error('Error fetching folder:', error);
    throw error;
  }
};