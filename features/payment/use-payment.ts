import { useQuery } from "@tanstack/react-query";

const fetchTransactions = async () => {
	const res = await fetch("https://api.razorpay.com/v1/payments/", {
		headers: {
			"Content-Type": "application/json",
			// Add authentication headers (replace with your actual auth method)
			Authorization:
				"Basic " +
				btoa(
					`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}`
				),
		},
	});

	if (!res.ok) {
		throw new Error(`Server error: ${res.status} ${res.statusText}`);
	}

	const data = await res.json();
	return data.items;
};

export const useTransactions = (options = {}) => {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: fetchTransactions,
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
		retry: 2, // Retry failed requests twice
		...options, // Allow overriding defaults
	});
};
