import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import { contract } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { eq, and } from "drizzle-orm";

//  create a new contract
const ApprovalRouter = new Hono<Context>()

	.get("/", async (c) => {
		const inUser = c.get("user");
		// If user is undefined, log an error
		if (!inUser) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		// Query to get active contracts where recipient email matches user's email

		const contracts = await db.query.contract.findMany({
			where: and(
				eq(contract.approvalStatus, "pending"),
				eq(contract.recipientEmail, inUser.email)
			),
		});
		if (!contracts) return c.json({ a: "b" }, 400);
		return c.json({ contracts }, 200);
	})
	.get("/:hexId", async (c) => {
		const { hexId } = c.req.param();
		console.log(hexId);

		// Query to get class members along with their usernames
		const [data] = await db
			.select()
			.from(contract)
			.where(eq(contract.hexId, hexId));

		if (!data) {
			return c.json({ message: "No Data found" }, 403);
		}

		return c.json({ data }, 200);
	});

export default ApprovalRouter;
