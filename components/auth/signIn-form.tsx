"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { SignInSchema } from "@/types";
import { useSignIn } from "@/features/auth/use-auth";
import { Fingerprint, KeyRound, Loader2 } from "lucide-react";

export function SignInForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const { mutate, isPending } = useSignIn();
	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof SignInSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		mutate(values);
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-6'
				onSubmit={form.handleSubmit(onSubmit)}
				{...props}
			>
				<div className='flex flex-col items-center gap-2 text-center mb-5'>
					<h1 className='text-3xl font-haskoy-bold text-h2eadline'>
						Sign in to Raven
					</h1>
					<p className='text-paragraph text-sm text-balance'>
						please enter your credentials
					</p>
				</div>
				<div className='grid gap-6'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-[0.8em]'>Email</FormLabel>
								<FormControl>
									<Input
										disabled={isPending}
										className='h-10  border-form-label focus-visible:ring-1'
										placeholder='your@username'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-tertiary' />
							</FormItem>
						)}
					/>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[0.8em]'>
										Password
									</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											type='password'
											className='h-10 text-lg border-form-label focus-visible:ring-1'
											placeholder='*************'
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-tertiary' />
								</FormItem>
							)}
						/>
					</div>

					<Button
						disabled={isPending}
						type='submit'
						className='w-full  bg-button text-button-text text-sm border-0 cursor-pointer'
					>
						{isPending ? (
							<>
								<Loader2 className='animate-spin h-4 w-4' />
								Signing in
							</>
						) : (
							"Sign in"
						)}
					</Button>

					<div className='after:border-headline relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
						<span className='bg-background text-paragraph relative z-10 px-5'>
							or
						</span>
					</div>
					<div className='flex justify-between gap-4'>
						<Button
							disabled={isPending}
							variant='outline'
							className='w-40 bg-headline text-sm border-0 text-button-text'
						>
							<KeyRound />
							Google
						</Button>
						<Button
							disabled={isPending}
							variant='outline'
							className='w-40 bg-headline text-sm border-0 text-button-text'
						>
							<Fingerprint />
							Apple
						</Button>
					</div>
				</div>
				<div className='text-center text-sm '>
					Don't have an account?{" "}
					<a
						href='/sign-up'
						className='underline underline-offset-4 text-link'
					>
						Sign Up
					</a>
				</div>
			</form>
		</Form>
	);
}
