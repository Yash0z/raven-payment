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
	const query = useMutation<contractResponseType, Error, contractRequestType>({
		mutationKey: ["contracts"],
		mutationFn: async (json) => {
			const res = await client.api.contract.new.$post({ json });
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},

		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["activeContracts"] });
		},
		onError: () => {
			toast("Contract Approval failed", {
				position: "top-right",
			});
		},
	});
	return query;
};

export const getActiveContract = () => {
	const query = useQuery({
		queryKey: ["activeContracts"],
		queryFn: async () => {
			console.time("api-fetch");
			const res = await client.api.contract.active.$get();
			console.timeEnd("api-fetch");
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},
		// Add specific settings to control refetching behavior
		staleTime: 60000, // Consider data fresh for 10 seconds
		refetchOnWindowFocus: false, // Don't refetch on window focus
		retry: 1, // Only retry once if fails
	});

	return query;
};
