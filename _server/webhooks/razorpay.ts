import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import crypto from "crypto";
import { contract, scheduled, transaction } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { eq } from "drizzle-orm";
import { TimelineType } from "@/types/types";
// Define types for Razorpay webhook payloads
interface RazorpayWebhookBody {
	event: string;
	payload: {
		payment: {
			entity: RazorpayPaymentEntity;
		};
	};
}

interface RazorpayPaymentEntity {
	id: string;
	entity: string;
	amount: number;
	currency: string;
	status: string;
	order_id: string;
	method: string;
	amount_refunded: number;
	refund_status: string | null;
	captured: boolean;
	description: string | null;
	notes: {
		contractId: string;
		contractName: string;
		userEmail: string;
		amount: string;
		[key: string]: string | undefined;
	};
	created_at: number;
}

const WebhookRouter = new Hono<Context>();

// Razorpay webhook handler
WebhookRouter.post("/", async (c) => {
	try {
		// Get the webhook data and signature from headers
		const webhookBody = (await c.req.json()) as RazorpayWebhookBody;
		const razorpaySignature = c.req.header("x-razorpay-signature");

		if (!razorpaySignature) {
			return c.json({ error: "Missing Razorpay signature" }, 400);
		}

		// Verify the webhook signature
		const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
		if (!webhookSecret) {
			console.error(
				"Webhook secret is not defined in environment variables"
			);
			return c.json({ error: "Server configuration error" }, 500);
		}

		const isValidSignature = verifyWebhookSignature(
			JSON.stringify(webhookBody),
			razorpaySignature,
			webhookSecret
		);

		if (!isValidSignature) {
			return c.json({ error: "Invalid signature" }, 401);
		}

		// Handle different event types
		const event = webhookBody.event;
		const paymentEntity = webhookBody.payload.payment.entity;

		switch (event) {
			case "payment.authorized":
				await handlePaymentAuthorized(paymentEntity);
				break;

			case "payment.captured":
				await handlePaymentCaptured(paymentEntity);
				break;

			case "payment.failed":
				await handlePaymentFailed(paymentEntity);
				break;

			// Add more event types as needed
			default:
				console.log(`Unhandled event type: ${event}`);
		}

		return c.json({ received: true }, 200);
	} catch (error) {
		console.error("Webhook error:", error);
		return c.json({ error: "Webhook processing failed" }, 500);
	}
});

// Function to verify Razorpay webhook signature
function verifyWebhookSignature(
	webhookBody: string,
	signature: string,
	secret: string
): boolean {
	const expectedSignature = crypto
		.createHmac("sha256", secret)
		.update(webhookBody)
		.digest("hex");

	try {
		return crypto.timingSafeEqual(
			Buffer.from(expectedSignature, "hex"),
			Buffer.from(signature, "hex")
		);
	} catch (error) {
		console.error("Signature verification error:", error);
		return false;
	}
}

// Handler functions for different payment events
async function handlePaymentAuthorized(
	payment: RazorpayPaymentEntity
): Promise<void> {
	// Payment is authorized but not captured yet
	// Update your database or take appropriate action
	console.log("Payment authorized:", payment.id);

	// Example: Update contract status in database
	// if (payment.notes.contractId) {
	//   await ContractSchema.updateOne(
	//     { _id: payment.notes.contractId },
	//     { $set: { paymentStatus: "authorized" } }
	//   );
	// }
}

async function handlePaymentCaptured(
	payment: RazorpayPaymentEntity
): Promise<void> {
	// Payment is successfully captured
	console.log("Payment captured:", payment.id);
	console.log(payment.notes);
	if (payment.notes.contractId) {
		await db
			.insert(transaction)
			.values({
				amount: payment.notes.amount,
				contractId: payment.notes.contractId,
				payerId: payment.notes.userEmail,
				transactionId: payment.id,
				updatedAt: new Date(),
			})
			.returning();
		await db
			.update(contract)
			.set({
				paymentStatus: "completed",
				approvalStatus: "accepted",
				updatedAt: new Date(),
				approvedBy: payment.notes.userEmail,
			})
			.where(eq(contract.hexId, payment.notes.contractId))
			.returning();
	}
	//create scheduled payouts
	const [contractData] = await db
		.select()
		.from(contract)
		.where(eq(contract.hexId, payment.notes.contractId));
      console.log("donedata")
	const timeline = contractData.timeline as TimelineType[];
   console.log(timeline)
	for (const milestone of timeline) {
		try {
			// Convert date format from DD-MM-YY to a proper Date object
			const [day, month, year] = milestone.date.split("-");
			const payoutDate = new Date(`20${year}-${month}-${day}T12:00:00Z`);
			// Otherwise, store in database for scheduled processing
			await db.insert(scheduled).values({
				contractId: contractData.hexId,
				milestoneId: milestone.id,
				senderId: contractData.approvedBy,
				receiverId: contractData.createdBy,
				amount: milestone.payment,
				scheduledDate: payoutDate,
				status: "scheduled",
			});
		} catch (error) {
			console.error(
				`Error scheduling payout for milestone ${milestone.id}:`,
				error
			);
		}
	}
}

async function handlePaymentFailed(
	payment: RazorpayPaymentEntity
): Promise<void> {
	// Payment has failed
	console.log("Payment failed:", payment.id);

	if (payment.notes.contractId) {
		await db
			.update(contract)
			.set({
				paymentStatus: "failed",
				approvalStatus: "pending",
				updatedAt: new Date(),
			})
			.where(eq(contract.hexId, payment.notes.contractId))
			.returning();
	}
}

export default WebhookRouter;
