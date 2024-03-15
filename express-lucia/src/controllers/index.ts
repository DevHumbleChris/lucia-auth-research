import { Request, Response } from "express";
import { lucia } from "../auth.js";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { isValidEmail } from "../validations/index.js";
import { PrismaClient, User } from "@prisma/client";

const client = new PrismaClient();

const healthCheck = (req: Request, res: Response) => {
  return res.json({
    message: "Everything is super okey 😂🚀",
  });
};

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return res
      .json({
        message: "Invalid email",
      })
      .status(400);
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res
      .json({
        message: "Invalid Password",
      })
      .status(400);
  }

  // Hash Password
  const hashedPassword = await new Argon2id().hash(password);

  // Generate Ids
  const userId = generateId(15);

  try {
    // Create a new User
    const user = await client.user.create({
      data: {
        id: userId,
        email,
        password: hashedPassword,
      },
    });

    // Create Session for the User
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    console.log(user);
    return res
      .appendHeader("Set-Cookie", sessionCookie.serialize())
      .redirect("/");
  } catch {
    return res
      .json({
        message: "Email already used",
      })
      .status(400);
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return res
      .json({
        message: "Invalid Email",
      })
      .status(400);
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res
      .json({
        message: "Invalid Password!",
      })
      .status(400);
  }

  // Check if user exists
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res
      .json({
        message: `Email: ${email}, Doesn't Exists`,
      })
      .status(400);
  }

  const validPassword = await new Argon2id().verify(user.password, password);

  if (!validPassword) {
    return res
      .json({
        message: "Incorrect Password!",
      })
      .status(400);
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return res
    .appendHeader("Set-Cookie", sessionCookie.serialize())
    .redirect("/");
};

export { healthCheck, signup, signin };
