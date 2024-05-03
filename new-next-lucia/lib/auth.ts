import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./db";
import { cookies } from "next/headers"; // Leave this unchanged
import { cache } from "react";
import { GitHub, Google } from "arctic";

import type { DatabaseSession, DatabaseUser, Session, User } from "lucia";
import { PrismaClient } from "@prisma/client";

function transformIntoDatabaseSession(
  raw: {
    user: {
      id: string;
      email: string;
      OAuthAccount: {
        providerId: string;
        providerUserId: string;
        userId: string;
      }[];
    };
  } & {
    id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }
): DatabaseSession {
  const { id, userId, expiresAt, ...attributes } = raw;
  return {
    id,
    userId,
    expiresAt,
    attributes,
  };
}

function transformIntoDatabaseUser(raw: {
  user: {
    id: string;
    email: string;
    OAuthAccount: OauthAccount[];
  };
}): DatabaseUser {
  const { id, ...attributes } = raw.user;
  return {
    id,
    attributes,
  };
}

class CustomAdapter extends PrismaAdapter<PrismaClient> {
  public async getSessionAndUser(
    sessionId: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const result = await prisma.session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        user: {
          select: {
            email: true,
            id: true,
            OAuthAccount: true,
          },
        },
      },
    });

    if (!result) return [null, null];

    return [
      transformIntoDatabaseSession(result),
      transformIntoDatabaseUser(result),
    ];
  }
}

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => attributes,
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      id: string;
      email: string;
      OAuthAccount: OauthAccount[];
    };
  }
}

interface OauthAccount {
  providerId: string;
  providerUserId: string;
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!
);

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);
