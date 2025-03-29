import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
	plugins: [
		inferAdditionalFields({
			user: {
				MerchentId: {
					type: "string",
				},
			},
		}),
	],
	/** the base url of the server (optional if you're using the same domain) */
	baseURL: process.env.BETTER_AUTH_URL!,
});

export type Session = typeof authClient.$Infer.Session;
