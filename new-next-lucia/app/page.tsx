import Homepage from "@/components/Homepage";
import { validateRequest } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user, session } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  console.log(user)
  return (
    <Homepage />
  );
}
