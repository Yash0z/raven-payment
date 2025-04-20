import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import { zValidator } from "@hono/zod-validator";
import { contract, ContractSchema, user } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { generateHEXID } from "../utils/generateHEXID";
import { generateTimeline } from "../utils/generateTimeline";
import { eq } from "drizzle-orm";
import { z } from "zod";

const contractRouter = new Hono<Context>()
	//  create a new contract
	.post(
		"/new",
		zValidator(
			"json",
			ContractSchema.omit({
				hexId: true,
				createdBy: true,
				status: true,
				timeline: true,
				recipientId: true,
			})
		),
		async (c) => {
			const inUser = c.get("user");
			// If user is undefined, log an error
			if (!inUser) {
				console.error("Unauthorized access - User is missing.");
				return c.json({ error: "Unauthorized" }, 401);
			}
			const values = c.req.valid("json");
			const initialStatus = "active";
			const initialApprovalStatus = "pending";

			const timeline = generateTimeline(
				values.creationDate,
				values.expirationDate,
				values.milestones,
				parseFloat(values.amount)
			);

			const recipient = await db.query.user.findFirst({
				where: eq(user.email, values.recipientEmail),
				columns: {
					merchentId: true,
				},
			});

			// Handle case when recipient is not found
			if (!recipient) {
				return c.json({ error: "Recipient not found" }, 404);
			}
			const [data] = await db
				.insert(contract)
				.values({
					hexId: generateHEXID(),
					contractName: values.contractName,
					amount: values.amount.toString(),
					agreement: values.agreement,
					status: initialStatus,
					recipientEmail: values.recipientEmail,
					recipientId: recipient.merchentId,
					createdBy: inUser.email,
					creationDate: values.creationDate,
					expirationDate: values.expirationDate,
					milestones: values.milestones,
					timeline: timeline,
					approvalStatus: initialApprovalStatus,
				})
				.returning();

			console.log(data);
			return c.json(data);
		}
	)
	// Get my-contracts
	.get("/my-contracts", async (c) => {
		const inUser = c.get("user");
		// If user is undefined, log an error
		if (!inUser) {
			console.error("Unauthorized access - User is missing.");
			return c.json({ error: "Unauthorized" }, 401);
		}

		const myContracts = await db.query.contract.findMany({
			where: eq(contract.createdBy, inUser.email),
		});

		return c.json({ myContracts }, 200);
	})
	// Get approved-contracts
	.get("/approved-contracts", async (c) => {
		const inUser = c.get("user");
		// If user is undefined, log an error
		if (!inUser) {
			console.error("Unauthorized access - User is missing.");
			return c.json({ error: "Unauthorized" }, 401);
		}

		const approvedContracts = await db.query.contract.findMany({
			where: eq(contract.approvedBy, inUser.email),
		});

		return c.json({ approvedContracts }, 200);
	})

	// .get mycontract details using hexid
	.get("my-contracts/:hexId", async (c) => {
		const inUser = c.get("user");
		// If user is undefined, log an error
		if (!inUser) {
			console.error("Unauthorized access - User is missing.");
			return c.json({ error: "Unauthorized" }, 401);
		}
		const { hexId } = c.req.param();
		// Query to get class members along with their usernames
		const [data] = await db
			.select()
			.from(contract)
			.where(eq(contract.hexId, hexId));

		if (!data) {
			return c.json({ message: "No Data found" }, 403);
		}

		return c.json({ data }, 200);
	})
	// .get approvedcontract details using hexid
	.get("approved-contracts/:hexId", async (c) => {
		const inUser = c.get("user");
		// If user is undefined, log an error
		if (!inUser) {
			console.error("Unauthorized access - User is missing.");
			return c.json({ error: "Unauthorized" }, 401);
		}
		const { hexId } = c.req.param();
		// Query to get class members along with their usernames
		const [data] = await db
			.select()
			.from(contract)
			.where(eq(contract.hexId, hexId));

		if (!data) {
			return c.json({ message: "No Data found" }, 403);
		}

		return c.json({ data }, 200);
	})
	.patch("/update",
		zValidator(
			"json",
			z.object({
				contractId: z.string(),
			})
		),
		async (c) => {
			const values = c.req.valid("json");
			const [updatedStatus] = await db
				.update(contract)
				.set({
					status: "completed",
				})
				.where(eq(contract.hexId, values.contractId))
				.returning();

			return c.json(updatedStatus, 200);
		}
	);
export default contractRouter;
