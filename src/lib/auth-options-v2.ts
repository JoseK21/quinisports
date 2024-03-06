import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "John", email: credentials?.email };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", //sigin page
  },
};

// callbacks: {
//   async redirect({ url, baseUrl }) {
//     console.log("🚀 >>  redirect >>  baseUrl:", baseUrl, { url });
//     if (url === "" || url === "/") return "/auth/login";

//     return url;
//   },
// },