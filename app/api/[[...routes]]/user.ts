import { auth } from "@/lib/auth";
import { Hono } from "hono";

const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null
	}
}>();

app.get("/", async (c) => {
	const session = c.get("session")
	const user = c.get("user")
   console.log(session, user)
	
	if(!user) return c.body(null, 401);
 
  	return c.json({
	  session,
	  user
	});
});

export default app;