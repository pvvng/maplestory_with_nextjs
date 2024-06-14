import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";

exports.handler = async (event :any, context :any) => {
    let client;
    
    try {
        // MongoDB 연결
        client = await connectDB;
        const db = client.db('maple-bgm');

        // 현재 날짜
        const now = new Date();
        const isoNow = now.toISOString();
        const isoNowDate = isoNow.substring(0, isoNow.indexOf('T'));
        // 자정 기준 어제 날짜
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        // iso 변환
        const isoYesterday = yesterday.toISOString();
        let isoYesterdayDate = isoYesterday.substring(0, isoYesterday.indexOf('T'));

        // 업데이트할 문서들을 찾아서 Bulk Write Operations를 사용하여 업데이트
        const filter = {
            updatedAt: { $regex: isoNowDate } // 어제 날짜에 해당하는 문서 필터링
        };

        const updateOperations = [
            {
                updateMany: {
                    filter: filter,
                    update: {
                        $set: {
                            previousViews: '$currentViews', // currentViews를 previousViews로 복사
                            increaseViews: 0, // viewIncrease를 0으로 설정
                            updatedAt: isoNow
                        }
                    }
                }
            }
        ];

        // Bulk Write Operations 실행
        const result = await db.collection('views').bulkWrite(updateOperations);

        console.log(`${result.modifiedCount} documents updated`);

        // 성공적인 응답 반환
        return {
            statusCode: 200,
            body: JSON.stringify('업데이트 완료'),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        console.error('업데이트 중 에러 발생:', error);

        // 에러 응답 반환
        return {
            statusCode: 500,
            body: JSON.stringify({ error: '서버 오류' }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } 
    // finally {
    //     // MongoDB 클라이언트 연결 닫기
    //     if (client) {
    //         await client.close();
    //     }
    // }
};