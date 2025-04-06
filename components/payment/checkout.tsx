"use client";
import _Loader from "@/components/misc/pageLoader";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface OrderData {
	success: boolean;
	order: {
		id: string;
		amount: number;
		currency: string;
	};
	key_id: string;
}

interface RazorpayOptions {
	key: string;
	amount: number;
	currency: string;
	name: string;
	description: string;
	order_id: string;
	handler: () => void;
	prefill: {
		name: string;
		email: string;
		contact: string;
	};
	notes: {
		contractId: string;
	};
	theme: {
		color: string;
	};
	modal?: {
		ondismiss: () => void;
	};
	retry?: {
		enabled: boolean;
		max_count: number;
	};
}

declare global {
	interface Window {
		Razorpay: new (options: RazorpayOptions) => {
			open: () => void;
		};
	}
}

const RazorpayCheckout: React.FC = () => {
	const router = useRouter();
	const { id } = useParams();
	const [loading, setLoading] = React.useState(false);
	const [paymentComplete, setPaymentComplete] = React.useState(false);
	const queryClient = useQueryClient();
	// Function to load the Razorpay script
	const loadRazorpayScript = () => {
		return new Promise((resolve) => {
			// Check if script is already loaded
			if (window.Razorpay) {
				resolve(true);
				return;
			}

			const script = document.createElement("script");
			script.src = "https://checkout.razorpay.com/v1/checkout.js";
			script.onload = () => resolve(true);
			document.body.appendChild(script);
		});
	};

	const handlePayment = async () => {
		setLoading(true);
		try {
			// Load Razorpay script if not already loaded
			await loadRazorpayScript();

			// Fetch order details from your API
			const response = await fetch(`/api/payment/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data: OrderData = await response.json();
			if (!data.success) {
				throw new Error("Failed to create payment order");
			}

			// Configure Razorpay options
			const options: RazorpayOptions = {
				key: data.key_id,
				amount: data.order.amount,
				currency: data.order.currency,
				name: "Your Company Name",
				description: "Contract Payment",
				order_id: data.order.id,
				handler: function () {
					queryClient.invalidateQueries({
						queryKey: ["approved-contracts"],
					});
					queryClient.invalidateQueries({
						queryKey: ["approval-data"],
					});
					setPaymentComplete(true);
					toast.success("Payment Successful, Contract Approved", {
						position: "top-right",
					});
					setTimeout(() => {
						router.push("/dashboard");
					}, 1000);
				},
				modal: {
					ondismiss: function () {
						// Only handle dismiss if payment was not complete
						if (!paymentComplete) {
							toast.error("Payment cancelled", {
								position: "top-right",
							});
							setTimeout(() => {
								router.push("/approvals");
							}, 1000);
						}
						setLoading(false);
					},
				},
				prefill: {
					name: "Customer Name",
					email: "customer@example.com",
					contact: "9876543210",
				},
				notes: {
					contractId: id as string,
				},
				theme: {
					color: "#ff555e",
				},
				retry: {
					enabled: true,
					max_count: 3,
				},
			};

			// Initialize Razorpay
			const paymentObject = new window.Razorpay(options);
			paymentObject.open();
		} catch (error) {
			console.error("Payment failed:", error);
			toast.error("Payment initialization failed. Please try again.", {
				position: "top-right",
			});
			setTimeout(() => {
				router.push("/approvals");
			}, 1000);
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			{paymentComplete ? (
				<_Loader />
			) : (
				<Button
					onClick={handlePayment}
					disabled={loading}
					className='rounded-md'
					variant='outline'
				>
					{loading ? "Processing..." : "Pay Now"}
				</Button>
			)}
		</div>
	);
};

export default RazorpayCheckout;
