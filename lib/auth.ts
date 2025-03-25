import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { db } from "@/server/lib/db";
import { schema } from "@/server/lib/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema, // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true,
	},
});
