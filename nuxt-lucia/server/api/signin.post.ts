import { Argon2id } from "oslo/password";
import { prisma } from "~/prisma/db";
import { isValidEmail } from "../utils/validation";

export default eventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    throw createError({
      message: "Invalid email",
      statusCode: 400,
    });
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw createError({
      message: `${email}, Doesn't Exists`,
      statusCode: 400,
    });
  }

  const validPassword = await new Argon2id().verify(user.password, password);

  if (!validPassword) {
    throw createError({
      message: "Incorrect Password",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(user.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
