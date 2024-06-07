export const fetchImages = async () => {
  try {
    const response = await fetch('/api/getImage');
    const data = await response.json();
    return data
  } catch (error) {
    console.error('이미지 로드에 실패했습니다 : ', error);
  }
};