import { validateRequest } from "@/lib/auth";
import SignupForm from "./components/SignupForm";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const { user } = await validateRequest();
    if (user) {
        return redirect("/");
    }
    return (
        <SignupForm />
    );
}
