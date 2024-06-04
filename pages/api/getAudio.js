import aws from 'aws-sdk';

export default async function handler(req, res) {

    // AWS 구성을 설정합니다.
    aws.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: 'ap-northeast-2', 
        signatureVersion: 'v4',
    });

    // S3 객체를 생성합니다.
    const s3 = new aws.S3();

    // 다운로드할 파일의 버킷 이름과 키를 지정합니다.
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: req.query.audio // 예: 'audio/song.mp3'
    };

    try {
        // 파일의 메타데이터 가져오기
        const headParams = {
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