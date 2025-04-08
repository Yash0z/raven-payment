import { client } from "@/lib/hono-client";
import { useQuery } from "@tanstack/react-query";

export const useTransacts = () => {
	return useQuery({
		queryKey: ["transacts"],
		queryFn: async () => {
			const res = await client.api.transaction.all.$get();

			if (!res.ok) {
				throw new Error("Server error");
			}
			return await res.json();
		},
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
		retry: 2, // Retry failed requests twice
	});
};
