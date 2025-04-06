"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

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
	handler: (response: any) => void;
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
}

declare global {
	interface Window {
		Razorpay: new (options: RazorpayOptions) => {
			open: () => void;
		};
	}
}

const Checkout: React.FC = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);

	// Function to load the Razorpay script
	const loadRazorpayScript = () => {
		return new Promise((resolve) => {
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
					// Include authorization header if needed
					// "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
				handler: function (response) {
					// Handle successful payment
					alert(
						"Payment Successful! Payment ID: " +
							response.razorpay_payment_id
					);

					// You can redirect to a success page or verify the payment on your server
					// window.location.href = `/payment/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`;
				},

				prefill: {
					name: "Customer Name", // You can populate these with actual user data
					email: "customer@example.com",
					contact: "9876543210",
				},
				notes: {
					contractId: id as string,
				},
				theme: {
					color: "#3399cc",
				},
			};

			// Initialize Razorpay
			const paymentObject = new window.Razorpay(options);
			paymentObject.open();
		} catch (error) {
			console.error("Payment failed:", error);
			alert("Payment initialization failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen'>
				{" "}
				<Button
					onClick={handlePayment}
					disabled={loading}
					className='rounded-md'
               variant="outline"
				>
					{loading ? "Processing..." : "Pay Now"}
				</Button>
			</div>
		</>
	);
};

export default Checkout;
