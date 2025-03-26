import { auth } from "@/lib/auth";
import { Context, Next } from "hono";

const SessionMiddleware = async (c: Context, next: Next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	c.set("user", session.user);
	c.set("session", session.session);

	return next();
};

export default SessionMiddleware;
