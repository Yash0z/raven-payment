import { z } from "zod";

export const SignUpSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "password must be atleast 8 characters long" })
		.max(20),
	MerchentId: z.string(),
});

export const SignInSchema = z.object({
	email: z.string().min(2).max(50),
	password: z.string(),
});

export const ContractSchema = z.object({
	contracName: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	amount: z.string().min(1, {
		message: "Amount is required.",
	}),
	agreement: z.string().min(2, {
		message: "Agreement must be at least 2 characters.",
	}),
	expirationDate: z.string().min(1, {
		message: "Expiration date is required.",
	}),
	creationDate: z.string().min(1, {
		message: "Creation date is required.",
	}),
	milestones: z.coerce.number().int().positive({
		message: "Milestones must be a positive number.",
	}),
});
