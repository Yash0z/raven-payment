import { auth } from '@/lib/auth'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from "hono/cors";

const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null
	}
}>()
app.use(
	"/api/auth/*", // or replace with "*" to enable cors for all routes
	cors({
		origin: "http://localhost:3000", // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: false   ,
	}),
);
app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
 
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	return next();
  	}
 
  	c.set("user", session.user);
  	c.set("session", session.session);
  	return next();
});
 
app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});
 

app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello Next.ewjs!',
  })
})
app.get("/api/session", async (c) => {
	const session = c.get("session")
	const user = c.get("user")
   console.log(session, user)
	
	if(!user) return c.body(null, 401);
 
  	return c.json({
	  session,
	  user
	});
});


app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

export const GET = handle(app)
export const POST = handle(app)

// routes
// import userRouter from "./user";
// const route = app.route("/api/session", userRouter)
// export type AppType = typeof route;
