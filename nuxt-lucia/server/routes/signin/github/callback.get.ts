import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        oauthAccount: {
          providerId: "github",
          providerUserId: githubUser.id.toString(),
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
            providerId: "github",
            providerUserId: githubUser.id.toString(),
            userAvatarURL: githubUser.avatar_url,
            userEmail: githubUser.email ? githubUser.email : "",
            userName: githubUser.login,
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

interface GitHubUser {
  id: number;
  login: string;
  email: string;
  avatar_url: string;
}
