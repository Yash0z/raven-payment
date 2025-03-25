import { Hono } from "hono";
import privateRoutesMiddleware from "@/server/middleware";
import { auth } from "@/lib/auth";

const privateRoutes = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>()
	.use(privateRoutesMiddleware)
	.get("/", (c) => {
		console.log("This is user", c.get("user"));
		console.log("This is session", c.get("session"));
		return c.json({ message: "Private route", user: c.get("user") });
	});

export default privateRoutes;
