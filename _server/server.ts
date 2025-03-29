import { Hono } from "hono";
import { auth } from "@/lib/auth";
import { Context } from "./utils/Authcontext";
import SessionMiddleware from "./middlewares/Session.Middleware";
import { cors } from "hono/cors";
const app = new Hono<Context>().basePath("/api");

//cors
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
	"*", // or replace with "*" to enable cors for all routes
	cors({
		origin: (origin, _) => {
			if (allowedOrigins.includes(origin)) {
				return origin;
			}
			return undefined;
		}, // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	})
);

//better-auth middleware
app.use("*", SessionMiddleware);

//better-auth handlers
app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

//routes
import userRouter from "./routes/userRoute";
import contractRouter from "./routes/contractRoute";
const routes = app
	.route("/user", userRouter)
	.route("/contract", contractRouter);
export type AppType = typeof routes;
export default app;
