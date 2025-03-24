
// // type UserResponseType = InferResponseType<typeof client.api.user.$get, 200>;

// import { useQuery } from "@tanstack/react-query";

// export const getUser = () => {
// 	const query = useQuery({
// 		queryKey: ["users"],
// 		queryFn: async () => {
// 			const res = await client.api.session.$get();

// 			if (!res.ok) {
// 				throw new Error("Server Error");
// 			}
// 			const data = await res.json();
// 			return data;
// 		},
// 	});
// 	return query;
// };