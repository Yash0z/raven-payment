import { client } from "@/lib/hono-client";
import { useQuery } from "@tanstack/react-query";

// type ApprovalResponseType = InferResponseType<
//    typeof client.api.contract.new.$post,
//    200
// >;
// type contractRequestType = InferRequestType<
//    typeof client.api.contract.new.$post
// >["json"];

// get approvals
export const getApprovals = () => {
	const query = useQuery({
		queryKey: ["approvals"],
		queryFn: async () => {
			const res = await client.api.approvals.$get();
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
//approva; details
export const getApprovalDetails = (hexId: string) => {
	const query = useQuery({
		queryKey: ["approval-data", hexId],
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
