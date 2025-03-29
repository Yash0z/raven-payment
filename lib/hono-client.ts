import { AppType } from "@/_server/server";
import { hc } from "hono/client";
export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);

