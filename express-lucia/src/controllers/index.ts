import { Request, Response } from "express";
import { lucia } from "../auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { isValidEmail } from "../validations";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const healthCheck = (req: Request, res: Response) => {
  return res.json({
    message: "Everything is super okey 😂🚀",
  });
};

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return new Response("Invalid password", {
      status: 400,
    });
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

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch {
    return new Response("Email already used", {
      status: 400,
    });
  }
};

const signin = async (req: Request, res: Response) => {};

export { healthCheck, signup };
