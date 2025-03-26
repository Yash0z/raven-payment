import { Hono } from "hono";
import { auth } from "@/lib/auth";

const userRouter = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>()
	.get("/user", (c) => {
		console.log("This is user", c.get("user"));
		return c.json({ message: "User", user: c.get("user") });
	})
	.get("/session", (c) => {
		console.log("This is session", c.get("session"));
		return c.json({ message: "session", user: c.get("session") });
	});

export default userRouter;
