
import { SignInForm } from "@/components/auth/signIn-form";

export default function SignIn() {
	return (
		<div className='bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
			<div className='w-full  max-w-sm md:max-w-4xl'>
				<SignInForm />
			</div>
		</div>
	);
}
