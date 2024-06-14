import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = (await connectDB).db('maple-bgm');

        // 현재 날짜
        const now = new Date();
        const isoNow = now.toISOString();
        // 자정 기준 어제 날짜
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        // iso 변환
        const isoYesterday = yesterday.toISOString();
        let isoYesterdayDate = isoYesterday.substring(0, isoYesterday.indexOf('T'));

        // 업데이트할 문서들을 찾아서 Bulk Write Operations를 사용하여 업데이트
        const filter = {
            updatedAt: { $regex: isoYesterdayDate } // 어제 날짜에 해당하는 문서 필터링
        };

        const updateOperations = [
            {
                updateMany: {
                    filter: filter,
                    update: {
                        $set: {
                            previousViews: "$currentViews", // currentViews를 previousViews로 복사
                            viewIncrease: 0, // viewIncrease를 0으로 설정
                            updatedAt: isoNow
                        }
                    }
                }
            }
        ];

        // Bulk Write Operations 실행
        const result = await db.collection('views').bulkWrite(updateOperations);

        console.log(`${result.modifiedCount} documents updated`);

        return res.status(200).json('업데이트 완료');
    } catch (error) {
        console.error('업데이트 중 에러 발생:', error);
        return res.status(500).json({ error: '서버 오류' });
    } finally {
        await (await connectDB).close();
    }
}