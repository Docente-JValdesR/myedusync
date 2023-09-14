import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectDB();
        const userFound = await User.findOne({
          email: credentials.email,
        }).select("+password");
        if (!userFound) throw new Error("User not found");
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Wrong password");

        return userFound;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
