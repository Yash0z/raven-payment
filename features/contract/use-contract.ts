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

type updateRequestType = InferRequestType<
	typeof client.api.contract.update.$patch
>["json"];
type updateResponseType = InferRequestType<
	typeof client.api.contract.update.$patch
>;
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
			queryClient.invalidateQueries({ queryKey: ["approved-contracts"] });
			queryClient.invalidateQueries({ queryKey: ["my-contracts"] });
			router.push("/dashboard");
			toast("Contract Created", {
				position: "top-right",
			});
		},
		onError: () => {
			toast("Contract Approval failed", {
				position: "top-right",
			});
		},
	});
	return query;
};

// approved-contracts
export const getApprovedContract = () => {
	const query = useQuery({
		queryKey: ["approved-contracts"],
		queryFn: async () => {
			const res = await client.api.contract["approved-contracts"].$get();
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
export const getApprovedContractDetails = (hexId: string) => {
	const query = useQuery({
		queryKey: ["approved-contract-data", hexId],
		queryFn: async () => {
			const res = await client.api.contract["approved-contracts"][
				":hexId"
			].$get({
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

//update contract status
export const useUpdateConstract = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const query = useMutation<updateResponseType, Error, updateRequestType>({
		mutationKey: ["update-contract-status"],
		mutationFn: async (json) => {
			const res = await client.api.contract.update.$patch({ json });
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},

		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["approval-data"], // Match the key used in getApprovals
			});
			queryClient.invalidateQueries({
				queryKey: ["approval-details"], // Match the key used in getApprovals
			});
			queryClient.invalidateQueries({ queryKey: ["approved-contracts"] });
			queryClient.invalidateQueries({ queryKey: ["my-contracts"] });
			router.push(`/dashboard`);
		},
		onError: () => {
			toast("Contract failed", {
				position: "top-right",
			});
		},
	});
	return query;
};
