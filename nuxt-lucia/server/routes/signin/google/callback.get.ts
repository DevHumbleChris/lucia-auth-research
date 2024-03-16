import { GoogleTokens, OAuth2RequestError, generateCodeVerifier } from "arctic";
import { generateId } from "lucia";
import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const codeVerifier = generateCodeVerifier();
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "google_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens: GoogleTokens = await google.validateAuthorizationCode(
      code,
      codeVerifier
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
    console.log(googleUser);

    const existingUser = await prisma.user.findFirst({
      where: {
        oauthAccount: {
          providerId: "google",
          providerUserId: googleUser.id.toString(),
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
            providerUserId: googleUser.id.toString(),
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
    console.log(e);
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
  id: number;
}
