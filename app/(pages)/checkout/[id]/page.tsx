import RazorpayCheckout from "@/components/payment/checkout";

const Checkout: React.FC = () => {
	return (
		<>
			<div className="h-full w-full flex justify-center ">
				<RazorpayCheckout />
			</div>
		</>
	);
};
export default Checkout;
