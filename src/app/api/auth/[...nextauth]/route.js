import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";
import User from "@/lib/models/User";
import connectDB from "@/lib/connectDB";



const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        create:{
        label:'Create Account or Login with existing account',style:{visibility:'hidden'}
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
        hint:{
          label:'Test Account',style:{display:'none'}
        },
        hintE:{
          label:'Email: test@test.com',style:{display:'none'}
        },
        hintP:{
          label:'Password: user1234',style:{display:'none'}
        }

      },
     
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        await connectDB();
        const user = await User.findOne({ email: email });
        const createUser = await User.create({
          email: email,
          password: password,
        });
        if (!user) {
          return createUser;
        }
        if (user && user.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  theme: {
    colorScheme: "auto",
    logo: "https://i.ibb.co/ncH5nNS/icon.png",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
