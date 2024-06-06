import { findFolderForFile } from "@/util/findFolder";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  const { fileName } = req.query;

  // fileName이 string인지 확인
  if (Array.isArray(fileName) || typeof fileName !== 'string') {
    return res.status(400).json({ error: '파일 이름에 오류가 발생했습니다.' });
  }

  if (!fileName) {
    return res.status(400).json({ error: '파일 이름이 정의되지 않았습니다.' });
  }

  try {
    const bucketName = process.env.BUCKET_NAME || ''; // S3 버킷 이름을 환경 변수에서 가져옴
    const folderName = await findFolderForFile(bucketName, fileName);
    return res.status(200).json({ folderName });
  } catch (error) {
    return res.status(500).json({ error: '폴더 검색 중 오류가 발생했습니다.' });
  }
}