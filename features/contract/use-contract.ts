import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono-client";

type contractResponseType = InferResponseType<
	typeof client.api.contract.new.$post,
	200
>;
type contractRequestType = InferRequestType<
	typeof client.api.contract.new.$post
>["json"];

export const useContract = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const query = useMutation<contractResponseType, Error, contractRequestType>({
		mutationKey: ["contracts"],
		mutationFn: async (json) => {
			const res = await client.api.contract.new.$post({ json });
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["active-contracts"] });
			toast("Contract Approval sent successfully", {
				position: "top-right",
			});
			router.push("/dashboard");
		},
		onError: (error: any) => {
			toast("Contract Approval sent successfully", {
				description: error,
				position: "top-right",
			});
		},
	});
	return query;
};

export const getActiveContract = () => {
	const query = useQuery({
		queryKey: ["active-contracts"],
		queryFn: async () => {
			const res = await client.api.contract.active.$get();
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},
	});
	return query;
};
