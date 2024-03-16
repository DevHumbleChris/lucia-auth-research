import { Lucia } from "lucia";
import { GitHub } from "arctic";
import { prisma } from "~/prisma/db";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // we don't need to expose the hashed password!
      id: attributes.id,
      email: attributes.email,
      oauthAccount: attributes.oauthAccount,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  email?: string;
  oauthAccount?: OauthAccount;
}

interface OauthAccount {
  providerId: string;
  providerUserId: string;
  userId?: string;
}

const config = useRuntimeConfig();

export const github = new GitHub(
  config.githubClientId,
  config.githubClientSecret
);
