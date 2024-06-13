import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req :NextApiRequest, res :NextApiResponse){
    // console.log(req.body)
    let filter = req.body.title

    let db = (await connectDB).db('maple-bgm');
    // 콜렉션에 들어온 데이터가 있는지 찾기
    let findResult = await db.collection('views').findOne({title : filter})

    // 콜렉션에 해당 데이터가 없는 경우
    if(!findResult){
        // 새로운 조회수 생성하기
        let result = await db.collection('views').insertOne(req.body)
        return res.status(200).json('조회수 업데이트 완료')
    }

    // 콜렉션에서 데이터 조회수 1 증가시키기
    let result = await db.collection('views').updateOne(
        { title : filter },
        { $inc : { view: 1 } }
    )

    return res.status(200).json('조회수 업데이트 완료')
}