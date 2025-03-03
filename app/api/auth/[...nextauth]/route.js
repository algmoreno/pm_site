import NextAuth from 'next-auth';
import User from '@/app/models/User';
import mongoClient from '@/app/lib/mongodb';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        try {
          await mongoClient();
          const user = await User.findOne({ email: credentials?.email });
          if (!user){
            throw new Error("")
          }
          const isPasswordValid = await bcrypt.compare(
            credentials?.password ?? "", user.password 
          );
          if (!isPasswordValid) {
            throw new Error("")
          }
          return user;
        }
        catch {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user){
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          firstName: token.firstName,
          role: token.role,
        }
      }
      return session
    }
  },
  pages: {
    login: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }