import NextAuth from "next-auth"

export const authOptions = {
  secret: process.env.NextAuth_SECRET,
  // Configure one or more authentication providers
  providers: [

    // ...add more providers here
  ],
}

export default NextAuth(authOptions);