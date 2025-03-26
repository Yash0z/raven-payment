import { authClient } from "@/lib/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useSignUp = () => {
	//   const queryClient = useQueryClient();
	const router = useRouter();

	const query = useMutation({
		mutationKey: ["sign-up"],
		mutationFn: async (values: any) => {
			const { data, error } = await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: values.name,
				callbackURL: "/dashboard",
			});

			if (error) throw error;
			return data;
		},
		onMutate: () => {
			//show loading
		},
		onSuccess: () => {
			toast("Sign-up successfull", {
				description: "Welcome",
			});
			router.push("/dashboard");
		},
		onError: (error) => {
			toast("Sign-up failed", {
				description: error.message,
			});
		},
	});

	return query;
};

export const useSignIn = () => {
	//   const queryClient = useQueryClient();

	const query = useMutation({
		mutationKey: ["sing-in"],
		mutationFn: async (values: any) => {
			const { data, error } = await authClient.signIn.email({
				email: values.email,
				password: values.password,
				callbackURL: "/dashboard",
			});

			if (error) throw error;
			return data;
		},
		onMutate: () => {
			//show loading
		},
		onSuccess: () => {
			toast("Sign-in successfull", {
				description: "Welcome",
			});
		},
		onError: (error) => {
			toast("Sign-in failed", {
				description: error.message,
			});
		},
	});

	return query;
};
