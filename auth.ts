import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./app/_lib/data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        if (!user.email || !user.name)
          throw new Error("User has no email or name!");

        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      const { id } = await getGuest(session.user.email);
      session.user.guestId = id;

      return session;
    },
  },
});
