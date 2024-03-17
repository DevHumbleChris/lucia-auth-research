import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Homepage from "./components/Homepage";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/signin");
  }

  return (
    <Homepage user={user} />
  );
}
