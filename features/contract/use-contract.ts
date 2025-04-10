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
			queryClient.invalidateQueries({ queryKey: ["all-contracts"] });
			queryClient.invalidateQueries({ queryKey: ["my-contracts"] });
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

// all-contracts
export const getAllContract = () => {
	const query = useQuery({
		queryKey: ["all-contracts"],
		queryFn: async () => {
			const res = await client.api.contract["all-contracts"].$get();
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
// my-contracts
export const getMyContract = () => {
	const query = useQuery({
		queryKey: ["my-contracts"],
		queryFn: async () => {
			const res = await client.api.contract["my-contracts"].$get();
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
export const getMyContractDetails = (hexId: string) => {
	const query = useQuery({
		queryKey: ["my-contract-data", hexId],
		queryFn: async () => {
			const res = await client.api.contract["my-contracts"][":hexId"].$get({
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
		enabled: !!hexId,
		refetchOnWindowFocus: false, //run only if you pass the hexid
	});

	return query;
};
export const getAllContractDetails = (hexId: string) => {
	const query = useQuery({
		queryKey: ["allcontract-data", hexId],
		queryFn: async () => {
			const res = await client.api.contract["all-contracts"][":hexId"].$get({
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
		enabled: !!hexId,
		refetchOnWindowFocus: false, //run only if you pass the hexid
	});

	return query;
};
