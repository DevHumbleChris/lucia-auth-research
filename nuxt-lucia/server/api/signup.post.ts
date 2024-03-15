import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
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

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  const user = await prisma.user.create({
    data: {
      id: userId,
      email,
      password: hashedPassword,
    },
  });

  // Check if Email exists.
  if (user.email) {
    throw createError({
      message: "Email already used",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
