import { GalleryVerticalEnd } from "lucide-react";

import { SignUpForm } from "@/components/auth/signUp-form";

export default function SignUp() {
	return (
		<div className='bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
			<div className='w-full max-w-sm md:max-w-4xl'>
				<SignUpForm />
			</div>
		</div>
	);
}
