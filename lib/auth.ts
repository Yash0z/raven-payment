import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { db } from "@/_server/modules/db/db";
import { schema } from "@/_server/modules/models/schema";

export const auth = betterAuth({
	user: {
		additionalFields: {
			merchentId: {
				type: "string",
				defaultValue: "",
				required: true,
				input: true,
			},
		},
	},
	trustedOrigins: ["http://localhost:3000", "http://192.168.29.96:3000"],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema, // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true,
	},
});
