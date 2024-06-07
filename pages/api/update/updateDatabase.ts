// aws 버킷의 종속성을 db에 업데이트 하는 api

import { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';
import { MongoClient } from 'mongodb';

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY!,
  secretAccessKey: process.env.SECRET_KEY!,
});

const uri = process.env.NEXT_PUBLIC_MONGODB_KEY!;
const dbName = 'maple-bgm';
const bucketName = process.env.BUCKET_NAME!;

async function listS3Objects(bucketName: string) {
  const params: S3.ListObjectsV2Request = {
    Bucket: bucketName,
  };

  let s3Objects: S3.ObjectList = [];
  let data: S3.ListObjectsV2Output;

  do {
    data = await s3.listObjectsV2(params).promise();
    s3Objects = s3Objects.concat(data.Contents || []);
    params.ContinuationToken = data.NextContinuationToken;
  } while (data.IsTruncated);

  return s3Objects;
}

async function updateDatabase(bucketName: string) {
  const s3Objects = await listS3Objects(bucketName);
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db(dbName);
  const files = database.collection('dependency');

  for (const obj of s3Objects) {
    const parts = obj.Key!.split('/');
    const fileName = parts.pop();
    const folderName = parts.join('/');

    if (fileName) {
      await files.updateOne(
        { fileName },
        { $set: { folderName } },
        { upsert: true }
      );
    }
  }

  await client.close();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await updateDatabase(bucketName);
      res.status(200).json({ message: 'Database updated successfully' });
    } catch (error) {
      console.error('Error updating database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
