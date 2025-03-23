import { db } from "../backend/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
   advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        partitioned: true // New browser standards will mandate this for foreign cookies
      }
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    
    //providers
    emailAndPassword: {  
      enabled: true
  },
          sameSite: "none",

});