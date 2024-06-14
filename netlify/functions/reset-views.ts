import { connectDB } from "@/util/database";

exports.handler = async () => {
    
    try {
        // MongoDB 연결
        const db = (await connectDB).db('maple-bgm');

        // 지금 시간
        const now = new Date();

        // 한국 시간 기준 오프셋 (UTC+9, 밀리초 단위)
        const koreanOffset = 9 * 60 * 60 * 1000;

        // 현재 시간에 한국 시간 오프셋을 더하여 한국 시간으로 변환
        const koreanNow = new Date(now.getTime() + koreanOffset);

        // 자정 기준 어제 날짜 구하기
        const yesterday = new Date(koreanNow);
        yesterday.setDate(yesterday.getDate());
        
        // 어제 날짜 ISO 형식으로 변환
        const isoYesterday = yesterday.toISOString();
        const isoYesterdayDate = isoYesterday.substring(0, isoYesterday.indexOf('T'));
        
        // 오늘 자정 시각을 구하기
        const todayMidnight = new Date(koreanNow);
        // 자정 시간으로 설정 (0시 0분 0초 0밀리초)
        todayMidnight.setHours(0, 0, 0, 0);
        todayMidnight.setDate(todayMidnight.getDate() + 1);

        const isoTodayMidnight = todayMidnight.toISOString();
        const isoTodayMidnightDate = isoTodayMidnight.substring(0, isoTodayMidnight.indexOf('T'));
        
        // 업데이트할 문서들을 찾아서 Bulk Write Operations를 사용하여 업데이트
        let findArr = await db.collection('views').find({
            updatedAt: {
                // 어제 날짜 이상 ~ 오늘 자정 이하의 데이터 불러오기
                $gte: isoYesterdayDate,
                $lt: isoTodayMidnightDate
            }
        }).toArray();

        // 각 문서에 대해 업데이트 수행
        for (let fa of findArr) {
            let faTitle :string = fa.title;
            let currentViews :number = fa.currentViews;

            // 문서 업데이트
            let result = await db.collection('views').updateOne(
                { title: faTitle },
                {
                    $set: {
                        previousViews: currentViews, // currentViews를 previousViews로 복사
                        increaseViews: 0, // increaseViews를 0으로 설정
                        updatedAt: isoTodayMidnight // updatedAt을 현재 시간으로 설정
                    }
                }
            );

            // 콘솔 로그
            console.log(`standard : ${isoYesterdayDate} ~ ${isoTodayMidnightDate} / ${result.modifiedCount} documents updated for ${faTitle}`);
        }

        console.log(isoTodayMidnightDate)
        console.log(isoYesterdayDate)
        console.log(findArr)
        
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
};