import { client } from "@/lib/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type payoutResponseType = InferResponseType<typeof client.api.payout.$patch>;
type payoutRequestType = InferRequestType<
	typeof client.api.payout.$patch
>["json"];

export const usePayout = () => {
	const queryClient = useQueryClient();
	const query = useMutation<payoutResponseType, Error, payoutRequestType>({
		mutationKey: ["payout"],
		mutationFn: async (json) => {
			const res = await client.api.payout.$patch({ json });
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},

		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["approved-contract-data"],
			});
			queryClient.invalidateQueries({
				queryKey: ["my-contract-data"],
			});
			queryClient.invalidateQueries({ queryKey: ["approved-contracts"] });
			queryClient.invalidateQueries({ queryKey: ["my-contracts"] });
		},
		onError: () => {
			toast("Contract failed", {
				position: "top-right",
			});
		},
	});
	return query;
};
