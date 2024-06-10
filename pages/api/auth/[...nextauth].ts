import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`
        }
      }
    }),
  ],
  secret : process.env.SOCIAL_LOGIN_SECRET,
  callbacks: {
    async redirect({ url, baseUrl } : { url :string, baseUrl:string}) {
      // 외부 URL 리디렉션을 허용하지 않으려면 이 콜백을 사용자 정의합니다.
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
};
export default NextAuth(authOptions); 