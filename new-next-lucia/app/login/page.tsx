import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"
import LoginForm from "@/components/LoginForm"

export default async function LoginPage() {
    const { user } = await validateRequest();
    if (user) {
        return redirect("/");
    }
    return (
        <LoginForm />
    )
}
