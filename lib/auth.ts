import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { db } from "@/_server/modules/db/db";
import { schema } from "@/_server/modules/models/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema, // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true,
	},
});
