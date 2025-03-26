import { Hono } from "hono";
import { auth } from "@/lib/auth";
import SessionMiddleware from "../middlewares/Session.Middleware";

const userRouter = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>()
	.use(SessionMiddleware)
	.get("/user", (c) => {
		console.log("This is user", c.get("user"));
		console.log("This is session", c.get("session"));
		return c.json({ message: "Private route", user: c.get("user") });
	});

export default userRouter;
