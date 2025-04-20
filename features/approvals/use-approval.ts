import { client } from "@/lib/hono-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ApprovalResponseType = InferResponseType<
	typeof client.api.approvals.update.$patch
>;
type ApprovalRequestType = InferRequestType<
	typeof client.api.approvals.update.$patch
>["json"];

// get approvals
export const getApprovals = () => {
	const query = useQuery({
		queryKey: ["approval-data"],
		queryFn: async () => {
			const res = await client.api.approvals.$get();
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},
	});

	return query;
};
//approva; details
export const getApprovalDetails = (hexId: string) => {
	const query = useQuery({
		queryKey: ["approval-details", hexId],
		queryFn: async () => {
			const res = await client.api.approvals[":hexId"].$get({
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

//update approval
export const useUpdateApproval = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const query = useMutation<ApprovalResponseType, Error, ApprovalRequestType>({
		mutationKey: ["update-approval"],
		mutationFn: async (json) => {
			const res = await client.api.approvals.update.$patch({ json });
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
			router.push(`/approvals`);
		},
		onError: () => {
			toast("Contract failed", {
				position: "top-right",
			});
		},
	});
	return query;
};
