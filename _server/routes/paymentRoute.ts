import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import Razorpay from "razorpay";
import { contract } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { eq } from "drizzle-orm";

const PaymentRouter = new Hono<Context>()
	// GET route that accepts contractId as a parameter
	.get("/:contractId", async (c) => {
		const inUser = c.get("user");
		// If user is undefined, return unauthorized error
		if (!inUser) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		try {
			// Get contractId from URL parameters
			const contractId = c.req.param("contractId");
			const [data] = await db
				.select()
				.from(contract)
				.where(eq(contract.hexId, contractId));
			// Initialize Razorpay
			const razorpay = new Razorpay({
				key_id: process.env.RAZORPAY_KEY_ID,
				key_secret: process.env.RAZORPAY_SECRET,
			});

			// Create Razorpay order
			const order = await razorpay.orders.create({
				amount: Number(data.amount) * 100, // Convert to smallest currency unit (paise)
				currency: "INR", // Change as needed
				receipt: `contract_${contractId}`,
				notes: {
               paymentStatus: "pending",
					contractId: contractId,
					userId: inUser.id,
				},
			});

			return c.json(
				{
					success: true,
					order: order,
					key_id: process.env.RAZORPAY_KEY_ID, // Sending key_id to frontend for initialization
				},
				200
			);
		} catch (error) {
			console.error("Razorpay order creation failed:", error);
			return c.json(
				{
					success: false,
					error: "Failed to create payment order",
				},
				500
			);
		}
	});

export default PaymentRouter;
