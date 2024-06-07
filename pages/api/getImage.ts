// pages/api/get-images.ts
import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-northeast-2',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const folderName = '이미지';

  if (!bucketName) {
    return res.status(500).json({ error: 'Bucket name is not defined in environment variables' });
  }

  try {
    const params = {
      Bucket: bucketName,
      Prefix: `${folderName}/`,
    };

    // S3에서 객체 목록 가져오기
    const data = await s3.listObjectsV2(params).promise();
    const images = data.Contents?.map(item => {
      return {
        key: item.Key,
        url: `https://${bucketName}.s3.ap-northeast-2.amazonaws.com/${item.Key}`,
      };
    });

    res.status(200).json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images from S3' });
  }
}