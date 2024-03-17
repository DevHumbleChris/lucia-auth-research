import { validateRequest } from "@/lib/auth";
import SigninForm from "./components/SigninForm";
import { redirect } from "next/navigation";

export default async function SigninPage() {
    const { user } = await validateRequest();
    if (user) {
        return redirect("/");
    }
    return (
        <SigninForm />
    );
}
