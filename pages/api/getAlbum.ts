// json 데이터를 받아오는 api

import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 파일 경로로 JSON 파일 데이터 불러오기
    const filePath = path.join(process.cwd(), 'json', 'FolderName.json');

    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath); // 파일 존재하지 않음 로그
      return res.status(404).json({ error: 'File not found' });
    }

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    res.status(200).json(data);

  } catch (error) {
    console.error('JSON 파일을 불러오는 중 오류가 발생했습니다:', error); // 오류 로그
    res.status(500).json({ error: 'JSON 파일을 불러오는 중 오류가 발생했습니다' });
  }
}