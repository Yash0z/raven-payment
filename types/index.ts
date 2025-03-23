import { z } from "zod";

export const SignUpSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "password must be atleast 8 characters long" })
		.max(20),
});

export const SignInSchema = z.object({
	email: z.string().min(2).max(50),
	password: z.string(),
});
