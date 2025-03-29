import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import { zValidator } from "@hono/zod-validator";
import { contract, ContractSchema } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { generateHEXID } from "../utils/generateHEXID";
import { generateTimeline } from "../utils/generateTimeline";

const contractRouter = new Hono<Context>()
	.get("/data", (c) => {
		return c.json({ message: c.get("user") });
	})

	.post(
		"/new",
		zValidator(
			"json",
			ContractSchema.omit({
				hexId: true,
				createdBy: true,
				status: true,
				timeline: true,
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

			const [data] = await db
				.insert(contract)
				.values({
					hexId: generateHEXID(),
					name: values.name,
					amount: values.amount.toString(),
					agreement: values.agreement,
					status: initialStatus,
					createdBy: inUser.id,
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
