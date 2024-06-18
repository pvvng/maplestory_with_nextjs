import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = (await connectDB).db('maple-bgm');

        // 최근 24시간 동안 조회수가 가장 많이 증가한 음원 10개 불러오기
        const topTracks = await db.collection('views').find()
            // 조회수 등락별로 역순 정렬
            .sort({ viewIncrease: -1 })
            .limit(10)
            .toArray();

        return res.status(200).json(topTracks);
    } catch (error) {
        console.error('급상승 차트 업데이트 오류:', error);
        return res.status(500).json({ error: '서버 오류' });
    }
}