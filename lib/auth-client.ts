import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
	plugins: [
		inferAdditionalFields({
			user: {
				merchentId: {
					type: "string",
				},
			},
		}),
	],
	baseURL: process.env.BETTER_AUTH_URL!,
});
