import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';

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
  ],
  secret : process.env.SOCIAL_LOGIN_SECRET,
  callbacks: {
    async redirect({ url, baseUrl } :{url:any, baseUrl:any}) {
      // Ensure the URL is relative to the base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Otherwise, ensure it is the same origin URL
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
};
export default NextAuth(authOptions); 