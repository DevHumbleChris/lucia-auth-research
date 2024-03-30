import { prisma } from "@/lib/db";
import { lucia } from "@/lib/auth";
import { isValidEmail } from "@/lib/validations";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";

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

  try {
    // Check if user exists
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response(null, {
        status: 400,
        statusText: `${email}, Doesn't Exists`,
      });
    }

    const validPassword = await new Argon2id().verify(
      user.password as string,
      password
    );

    if (!validPassword) {
      return new Response(null, {
        status: 400,
        statusText: "Incorrect Password",
      });
    }

    const session = await lucia.createSession(user.id, {});
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
