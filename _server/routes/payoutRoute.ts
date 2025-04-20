import { Hono } from "hono";
import { Context } from "../utils/Authcontext";
import { contract, scheduled } from "../modules/models/schema";
import { db } from "../modules/db/db";
import { and, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { TimelineType } from "@/types/types";

const payoutRouter = new Hono<Context>().patch(
	"/",
	zValidator(
		"json",
		z.object({
			contractId: z.string(),
			milestoneId: z.string(),
			timeline: z.array(z.custom<TimelineType>()),
		})
	),
	async (c) => {
		const values = c.req.valid("json");

		// Create a copy of the timeline array
		const updatedTimeline: TimelineType[] = [...values.timeline];

		const [updatedStatus] = await db
			.update(contract)
			.set({
				timeline: updatedTimeline,
			})
			.where(eq(contract.hexId, values.contractId))
			.returning();

		const [updatedSchedule] = await db
			.update(scheduled)
			.set({
				status: "completed",
			})
			.where(
				and(
					eq(scheduled.contractId, values.contractId),
					eq(scheduled.milestoneId, values.milestoneId)
				)
			)
			.returning();

		return c.json({ updatedSchedule, updatedStatus }, 200);
	}
);
export default payoutRouter;
