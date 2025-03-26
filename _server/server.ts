import { Hono } from "hono";
import { auth } from "@/lib/auth";
import { Context } from "./utils/Authcontext";
import SessionMiddleware from "./middlewares/Session.Middleware";


const app = new Hono<Context>().basePath("/api");
app.use("*", SessionMiddleware);
//better-auth middleware

//better-auth handlers
app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

//routes
import userRouter from "./routes/userRoute";

const routes = app.route("/auth", userRouter);
export type AppType = typeof routes;
export default app;
