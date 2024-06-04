import axios from "axios";

export const fetchAudio = async (audioName :string) => {
    try {
      const response = await axios(`/api/getAudio?audio=${audioName}`);
      return response.data 
    } catch (error) {
      console.error('오디오를 가져오는 동안 오류가 발생했습니다:', error);
      if (typeof error === 'string'){
        throw new Error(error)
      }
    }
};

export const fetchFolder = async (folderName :string) => {
  try {
    const response = await axios(`/api/getFolder?folder=${folderName}`);
    return response.data 
  } catch (error) {
    console.error('폴더를 가져오는 동안 오류가 발생했습니다:', error);
    if (typeof error === 'string'){
      throw new Error(error)
    }
  }
};