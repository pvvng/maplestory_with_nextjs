import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

interface BucketType {
    Bucket : string,
    Key : string
}

export default async function handler(req :NextApiRequest, res :NextApiResponse) {

    const accessKey = process.env.ACCESS_KEY;
    const secretKey  = process.env.SECRET_KEY;
    const bucketName = process.env.BUCKET_NAME;

    if (accessKey === undefined || secretKey  === undefined || bucketName  === undefined){
        throw new Error('키 에러 발생');
    }

    // AWS 구성을 설정합니다.
    let query = req.query.audio;

    // 쿼리의 타입이 string이 아니면 에러 처리
    if(typeof query !== 'string' ){
        throw new Error('키 에러 발생');
    }

    aws.config.update({
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
        region: 'ap-northeast-2', 
        signatureVersion: 'v4',
    });

    // S3 객체를 생성합니다.
    const s3 = new aws.S3();

    // 다운로드할 파일의 버킷 이름과 키를 지정합니다.
    const params :BucketType = {
        Bucket: bucketName,
        Key: query  // 예: 'audio/song.mp3'
    };

    try {
        // 파일의 메타데이터 가져오기
        const headParams :BucketType = {
            Bucket: params.Bucket,
            Key: params.Key
        };
        const metadata = await s3.headObject(headParams).promise();

        // 파일 다운로드 URL 생성
        const audioUrl = await new Promise((resolve, reject) => {
            s3.getSignedUrl('getObject', params, (err, url) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url.split('?')[0]);
                }
            });
        });

        res.status(200).json({ audioUrl, metadata }); // 클라이언트에게 JSON 응답을 보냅니다.
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '파일을 가져오는 동안 오류가 발생했습니다.' });
    }
};