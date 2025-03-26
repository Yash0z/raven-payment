import { auth } from "@/lib/auth";

export const Session = auth.$Infer.Session.session;
export const User = auth.$Infer.Session.user;

export interface Context {
	Variables: {
		user: typeof User | null;
		session: typeof Session | null;
	};
}
