import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import { zValidator } from "@hono/zod-validator";
import { contract, ContractSchema, user } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { generateHEXID } from "../utils/generateHEXID";
import { generateTimeline } from "../utils/generateTimeline";
import { eq } from "drizzle-orm";

const contractRouter = new Hono<Context>()
	// .get("/data", (c) => {
	// 	return c.json({ message: c.get("user") });
	// })

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
			console.log("User:", inUser);
			const initialStatus = "active";
			const initialApprovalStatus = "pending";
			const timeline = generateTimeline(
				values.creationDate,
				values.expirationDate,
				values.milestones,
				parseFloat(values.amount)
			);

			console.log("Timeline:", timeline);

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
					createdBy: inUser.name,
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
	);

export default contractRouter;
