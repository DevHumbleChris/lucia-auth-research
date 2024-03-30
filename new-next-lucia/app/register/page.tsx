import RegisterForm from '@/components/RegisterForm'
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
    const { user } = await validateRequest();
    if (user) {
        return redirect("/");
    }
    return (
        <RegisterForm />
    )
}
