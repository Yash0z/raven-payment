import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { persistUser } from "@/utils/hydrate.user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";

export const SignOut = async (
	setUser: (update: SetStateAction<any>) => void,
	router: AppRouterInstance
) => {
	try {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast("Signed Out successfully");
					router.push("/sign-in");

					setTimeout(() => {
						setUser(null as any);
						persistUser(null as any);
						localStorage.removeItem("user");
					}, 500); // otherwise causes unhandled runtime on nextjs
				},
			},
		});
	} catch (error) {
		toast.error("Logout failed. Please try again.");
	}
};
