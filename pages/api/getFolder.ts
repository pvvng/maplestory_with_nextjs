import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req :NextApiRequest, res :NextApiResponse) {

    const accessKey = process.env.AWS_ACCESS_KEY;
    const secretKey  = process.env.AWS_SECRET_KEY;
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (accessKey === undefined || secretKey  === undefined || bucketName  === undefined){
        throw new Error('키 에러 발생');
    }

    // AWS 구성을 설정합니다.
    aws.config.update({
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
        region: 'ap-northeast-2', 
        signatureVersion: 'v4',
    });

    // S3 객체를 생성합니다.
    const s3 = new aws.S3();

    // 다운로드할 파일의 버킷 이름과 키를 지정합니다.
    const params = {
        Bucket: bucketName,
        Prefix: req.query.folder + '/' // 예: 'audio/song.mp3'
    };

    try {
        // 폴더 내의 객체 목록을 가져옵니다.
        const data = await s3.listObjectsV2(params).promise();
        // 객체 목록을 클라이언트에 반환합니다.
        res.status(200).json(data.Contents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '폴더를 가져오는 동안 오류가 발생했습니다.' });
    }
};