import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req :NextApiRequest, res:NextApiResponse){

  if(req.method === 'POST'){
    // 유저가 공백으로 장난질 치는거 막기
    let noSpaceUsername = (req.body.name).replaceAll(" ", "");

    const db = (await connectDB).db('maple-bgm');
    let result = db.collection('userdata').insertOne(req.body)

    if(noSpaceUsername === ''){
      return res.status(500).json('이름없음?ㅋ;');
    }

    return res.redirect(302, '/')
  }else{
    return res.status(500).json('먼가 잘못됨;')
  }

}