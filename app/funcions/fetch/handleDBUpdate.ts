// aws 버킷의 종속성을 db에 업데이트 하는 함수

export const handleUpdate = async () => {
  try {
    const response = await fetch('/api/updateDatabase');
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.log(data.error);
    }
  } catch (error) {
    console.log('db 업데이트 중 에러 발생');
  }
  console.log(false);
};