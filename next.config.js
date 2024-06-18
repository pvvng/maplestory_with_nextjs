/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // styled-components 활성화
  },
  // 기존 Next.js 설정
  experimental: {
    appDir: true,
  },
  images: {
    domains: [process.env.NETLIFY_AWS_BUCKET_NAME + '.s3.amazonaws.com', process.env.NETLIFY_AWS_BUCKET_NAME + '.s3.ap-northeast-2.amazonaws.com'], // S3 버킷 도메인 추가
    // 자주 변경되지 않는 리소스 캐싱 (이미지 최적화)
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats : ['image/webp'],
  },
};
// https://pvvng-maplemusic-storage.s3.ap-northeast-2.amazonaws.com/%EC%9D%B4%EB%AF%B8%EC%A7%80/%EC%97%94%EC%A0%A4%EB%A6%AD%EB%B2%84%EC%8A%A4%ED%84%B0.png

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
