import AWS from 'aws-sdk';

// AWS 자격 증명
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

/**
 * 특정 파일이 속한 폴더의 이름을 찾는 함수
 * @param {string} bucketName - S3 버킷 이름
 * @param {string} fileName - 찾고자 하는 파일의 이름
 * @returns {Promise<string>} - 파일이 속한 폴더의 이름
 */

export const findFolderForFile = async (bucketName: string, fileName: string): Promise<string> => {
  const params: AWS.S3.ListObjectsV2Request = {
    Bucket: bucketName,
    Prefix: '', // 버킷의 루트에서 시작
  };

  let folderName = '';

  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents;

    if (files) {
      for (const file of files) {
        if (file.Key && file.Key.endsWith(fileName)) {
          const pathParts = file.Key.split('/');
          if (pathParts.length > 1) {
            folderName = pathParts[pathParts.length - 2];
          }
          break;
        }
      }
    }

    return folderName;
  } catch (error) {
    console.error('폴더 검색 중 오류 발생 : ', error);
    throw error;
  }
};