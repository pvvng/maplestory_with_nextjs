import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),

    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID || "",
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    // }),
  ],
  secret : process.env.SOCIAL_LOGIN_SECRET
};
export default NextAuth(authOptions); 

// https://whkakrkr.tistory.com/entry/Next-auth%EB%A1%9C-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-5%EB%B6%84%EB%A7%8C%EC%97%90-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%F0%9F%91%BB
// https://velog.io/@uni/NextAuth.js-%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8-Next%EB%B2%84%EC%A0%84-13.4.2