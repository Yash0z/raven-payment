import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import { transaction } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { eq } from "drizzle-orm";

const TransactRouter = new Hono<Context>().get("/all", async (c) => {
	const inUser = c.get("user");
	// If user is undefined, log an error
	if (!inUser) {
		console.error("Unauthorized access - User is missing.");
		return c.json({ error: "Unauthorized" }, 401);
	}

	const transactions = await db.query.transaction.findMany({
		where: eq(transaction.payerId, inUser.email),
	});

	return c.json(transactions);
});

export default TransactRouter;
