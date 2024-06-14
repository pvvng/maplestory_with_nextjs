// 인기 급상승 가곡 10곡 뽑아오기

import { connectDB } from "@/util/database";

export default async function getTopTracks(){
  const db = (await connectDB).db('maple-bgm');

  // 최근 24시간 동안 조회수가 가장 많이 증가한 음원들을 찾기.
  const topTracks = await db.collection('views').find()
      .sort({ increaseViews: -1, currentViews: -1  })
      .limit(10)
      .toArray();

  return (topTracks)
}