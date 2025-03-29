import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import { schema } from "../models/schema";

dotenv.config({ path: ".env" });
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
