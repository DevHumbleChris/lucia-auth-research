import { prisma } from "@/lib/db";
import { lucia } from "@/lib/auth";
import { isValidEmail } from "@/lib/validations";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { generateId } from "lucia";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return new Response(null, {
      status: 400,
      statusText: "Invalid Email",
    });
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return new Response(null, {
      status: 400,
      statusText: "Invalid Password Length",
    });
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    // Check if user exists
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return new Response(null, {
        status: 400,
        statusText: `${email}, Already Exists`,
      });
    }

    await prisma.user.create({
      data: {
        id: userId,
        email,
        password: hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error: any) {
    console.log(error);
    return new Response(null, {
      status: 400,
      statusText: error.message,
    });
  }
}
