import CredentialsProvider from "@auth/core/providers/credentials";
import type { AuthConfig } from "@auth/core/types";
import { prisma } from "~~/db";
import { compare } from "bcrypt";
import { NuxtAuthHandler } from "#auth";

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig();

// Refer to Auth.js docs for more details

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,

  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",

      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw createError({
            statusCode: 403,
            statusMessage: "Credentials not working",
          });
        }

        const isPasswordValid = await compare(
          credentials?.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw createError({
            statusCode: 403,
            statusMessage: "Credentials not working",
          });
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // Specify here the payload of your token and session
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name + " " + user.surname;
        token.is_admin = user.is_admin;
        token.is_item_owner = user.is_item_owner;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.is_admin = token.is_admin;
      session.user.is_item_owner = token.is_item_owner;
      session.user.avatar = token.avatar;
      return session;
    },
  },
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
