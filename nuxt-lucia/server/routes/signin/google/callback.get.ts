import { GoogleTokens, OAuth2RequestError, generateCodeVerifier } from "arctic";
import { generateId } from "lucia";
import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "google_oauth_state") ?? null;
  const codeVerifier = getCookie(event, "code_verifier") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens: GoogleTokens = await google.validateAuthorizationCode(
      code,
      codeVerifier as string
    );

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const googleUser: GoogleUser = await googleUserResponse.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        oauthAccount: {
          providerId: "google",
          providerUserId: googleUser.sub,
        },
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );
      return sendRedirect(event, "/");
    }

    const userId = generateId(15);

    await prisma.user.create({
      data: {
        id: userId,
        oauthAccount: {
          create: {
            providerId: "google",
            providerUserId: googleUser.sub,
            userAvatarURL: googleUser.picture,
            userEmail: googleUser.email,
            userName: googleUser.name,
          },
        },
      },
    });
    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
    return sendRedirect(event, "/");
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      // invalid code
      throw createError({
        status: 400,
      });
    }
    throw createError({
      status: 500,
    });
  }
});

interface GoogleUser {
  sub: string;
  name: string;
  email: string;
  picture: string;
}
