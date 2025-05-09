import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { persistUser } from "@/hooks/user/hydrate.user";
import { authSignUp } from "@/types/types";
import { generateMerchantId } from "@/utils/generateMerchentId";

export const useSignUp = () => {
	//   const queryClient = useQueryClient();

	const router = useRouter();
	const [_, setUser] = useAtom(userAtom);

	const query = useMutation({
		mutationKey: ["sign-up"],
		mutationFn: async (values: authSignUp) => {
			const { data, error } = await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: values.name,
				merchentId: generateMerchantId(values.email),
				callbackURL: "/dashboard",
			});
			if (data && data.user) {
				const userData = {
					name: data.user.name,
					id: data.user.id,
					email: data.user.email,
					avatar: data.user.image,
				};
				setUser(userData);
				persistUser(userData);
			} else {
				throw new Error("Invalid response: data or user is null");
			}

			if (error) throw error;
			return data;
		},
		onMutate: () => {
			//show loading
		},
		onSuccess: () => {
			toast("Sign-up successfull", {
				position: "top-right",
				description: "Welcome",
			});

			router.push("/dashboard");
		},
		onError: (error) => {
			toast("Sign-up failed", {
				position: "top-right",
				description: error.message,
			});
		},
	});

	return query;
};

export const useSignIn = () => {
	//   const queryClient = useQueryClient();
	const [_, setUser] = useAtom(userAtom);

	const query = useMutation({
		mutationKey: ["sign-in"],
		mutationFn: async (values: any) => {
			const { data, error } = await authClient.signIn.email({
				email: values.email,
				password: values.password,
				callbackURL: "/dashboard",
			});
			if (data && data.user) {
				const userData = {
					name: data.user.name,
					id: data.user.id,
					email: data.user.email,
					avatar: data.user.image,
				};
				setUser(userData);
				persistUser(userData);
			} else {
				throw new Error("Invalid response: data or user is null");
			}

			if (error) throw error;
			return data;
		},
		onMutate: () => {
			//show loading
		},
		onSuccess: () => {
			toast("Sign-in successfull", {
				position: "top-right",
				description: "Welcome",
			});
		},
		onError: (error) => {
			toast("Sign-in failed", {
				position: "top-right",
				description: error.message,
			});
		},
	});

	return query;
};
