import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { session } = await validateRequest();
  if (!session) {
    return new Response(null, {
      status: 400,
      statusText: "Unauthorized",
    });
  }

  try {
    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 200,
      statusText: "Logout Successful",
    });
  } catch (error: any) {
    console.log(error);
    return new Response(null, {
      status: 400,
      statusText: error.message,
    });
  }
}
