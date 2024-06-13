import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let filter = { title: req.body.title };

        let db = (await connectDB).db('maple-bgm');
    
        // 현재 시간
        const now = new Date();
        const isoDateString = now.toISOString();
    
        // 콜렉션에 들어온 데이터가 있는지 찾기
        let findResult = await db.collection('views').findOne(filter);
    
        // 콜렉션에 해당 데이터가 없는 경우
        if (!findResult) {
            // 새로운 조회수 생성하기
            let result = await db.collection('views').insertOne({
                title: req.body.title,
                currentViews: 1,
                previousViews: 0,
                increaseViews: 1, // 새롭게 추가된 문서이므로 증가량은 1
                updatedAt: isoDateString 
            });
            return res.status(200).json('조회수 업데이트 완료');
        }
    
        // 기존 데이터의 currentViews와 previousViews를 가져와서 증가량 계산
        const newCurrentViews = findResult.currentViews + 1;
        const increaseViews = newCurrentViews - findResult.previousViews;
    
        // 콜렉션에서 데이터 조회수 1 증가시키기
        let result = await db.collection('views').updateOne(
            filter,
            {
                $inc: { currentViews: 1 },
                $set: { 
                    increaseViews: increaseViews, // 증가량 업데이트
                    updatedAt: isoDateString 
                }
            }
        );
    
        return res.status(200).json('조회수 업데이트 완료');
    } catch (error) {
        console.error('조회수 업데이트 오류:', error);
        return res.status(500).json({ error: '서버 오류' });
    }
}