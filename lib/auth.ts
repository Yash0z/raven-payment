import { schema } from "@/backend/model/schema";
import { db } from "../backend/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
   advanced: {
      crossSubDomainCookies: {
        enabled: true
      }
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema:schema // or "mysql", "sqlite"
    }),
    
    //providers
    emailAndPassword: {  
      enabled: true
  },
  session: {
   expiresIn: 60 * 60 * 24 * 7, // 7 days
   updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
   freshAge: 60 * 5 // 5 minutes (if the session is older than 5 minutes, it will be considered fresh)
}

});