import { Lucia } from "lucia";
import { GitHub, Google } from "arctic";
import { prisma } from "~/prisma/db";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const config = useRuntimeConfig();
const adapter = new PrismaAdapter(prisma.session, prisma.user); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => attributes,
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  email: string;
  oauthAccount: OauthAccount;
}

interface OauthAccount {
  providerId: string;
  providerUserId: string;
  userId: string;
  userEmail: string;
  userName: string;
  userAvatarURL: string;
}

export const github = new GitHub(
  config.githubClientId,
  config.githubClientSecret
);

export const google = new Google(
  config.googleClientId,
  config.googleClientSecret,
  process.env.GOOGLE_REDIRECT_URI as string
);
