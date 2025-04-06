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
app.use("*", (c, next) => {
   if (!c.req.path.includes("/webhook/")) {
     return SessionMiddleware(c, next);
   }
   return next();
 });

//better-auth handlers
app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

//routes
import userRouter from "./routes/userRoute";
import contractRouter from "./routes/contractRoute";
import ApprovalRouter from "./routes/approvalRoute";
import PaymentRouter from "./routes/paymentRoute";
import WebhookRouter from "./webhooks/razorpay";
const routes = app
	.route("/user", userRouter)
	.route("/contract", contractRouter)
	.route("/approvals", ApprovalRouter)
	.route("/payment", PaymentRouter)
	.route("/webhook/razorpay", WebhookRouter);
export type AppType = typeof routes;
export default app;
