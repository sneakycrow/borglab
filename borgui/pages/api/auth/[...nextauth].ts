import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export const nextAuthOptions = {
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_ID ?? "",
      clientSecret: process.env.TWITCH_SECRET ?? "",
    }),
  ],
};
export default NextAuth(nextAuthOptions);
