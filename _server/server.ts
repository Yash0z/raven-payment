import { Hono } from "hono";
import { auth } from "@/lib/auth";
import { Context } from "./utils/Authcontext";
import SessionMiddleware from "./middlewares/Session.Middleware";
import { cors } from "hono/cors";
const app = new Hono<Context>().basePath("/api");

//cors
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
	"*",
	cors({
		origin: (origin, _) => {
			// Allow Razorpay webhook calls (which might have no origin header)
			if (!origin || allowedOrigins.includes(origin)) {
				return origin || "*";
			}
			return undefined;
		},
		allowHeaders: ["Content-Type", "Authorization", "x-razorpay-signature"],
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
import TransactRouter from "./routes/transactRoute";
const routes = app
	.route("/user", userRouter)
	.route("/contract", contractRouter)
	.route("/approvals", ApprovalRouter)
	.route("/payment", PaymentRouter)
	.route("/transaction", TransactRouter)
	.route("/webhook/razorpay", WebhookRouter);
export type AppType = typeof routes;
export default app;
