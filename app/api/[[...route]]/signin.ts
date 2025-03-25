import { Hono } from "hono";

const app = new Hono()

	.get("/", async (c) => {})

	.post("/", async (c) => {});

export default app;
