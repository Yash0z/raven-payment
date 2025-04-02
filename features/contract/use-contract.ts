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

//create contract hook
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

		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["activeContracts"] });
			router.push("/dashboard");
		},
		onError: () => {
			toast("Contract Approval failed", {
				position: "top-right",
			});
		},
	});
	return query;
};

// get active contrats hook
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
		refetchOnWindowFocus: false, // Don't refetch on window focus
		retry: 1, // Only retry once if fails
	});

	return query;
};

// get contract data

export const getContractDetails = (hexId: string) => {
	const query = useQuery({
		queryKey: ["contract-data", hexId],
		queryFn: async () => {
			const res = await client.api.contract[":hexId"].$get({
				param: {
					hexId: hexId,
				},
			});

			if (!res.ok) {
				throw new Error("Server error");
			}

			const data = await res.json();
			return data;
		},
		enabled: !!hexId, //run only if you pass the hexid
	});

	return query;
};
