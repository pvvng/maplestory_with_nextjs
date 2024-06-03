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
        Key: '엔젤릭버스터/그랜드 피날레.mp3' // 예: 'audio/song.mp3'
    };

    // 파일을 다운로드합니다.
    const audioUrl = await new Promise((r) => 
      s3.getSignedUrl('getObject', params, async (err, url) => {
        if (err) {
          throw err;
        }
        r(url.split('?')[0]); //  return object url
      }),
    );

    res.status(200).json({ audioUrl });
};