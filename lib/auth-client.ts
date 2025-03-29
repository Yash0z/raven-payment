import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
	/** the base url of the server (optional if you're using the same domain) */
	baseURL: process.env.BETTER_AUTH_URL!,
});
