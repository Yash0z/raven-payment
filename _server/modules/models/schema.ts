import {
	pgTable,
	text,
	timestamp,
	boolean,
	numeric,
	integer,
	jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	merchentId: text("merchent_id").notNull().unique(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});
export const contract = pgTable("contract", {
	hexId: text("hex_id").primaryKey(), // Unique HEXID (3 letters + 3 numbers)
	contractName: text("name").notNull(), // Contract Name
	amount: numeric("amount", { precision: 10, scale: 2 }).notNull(), // Contract Amount
	status: text("status", {
		enum: ["active", "cancelled", "completed"],
	}).notNull(), // Contract Status
	creationDate: timestamp("creation_date").notNull().defaultNow(),
	recipientEmail: text("recipient_Email")
		.notNull()
		.references(() => user.email, { onDelete: "cascade" }),
	recipientId: text("recipient_id")
		.notNull()
		.references(() => user.merchentId, { onDelete: "cascade" }), // Creation Date
	createdBy: text("created_by")
		.notNull()
		.references(() => user.email, { onDelete: "cascade" }), // Creator of the Contract
	expirationDate: timestamp("expiration_date").notNull(), // Expiration Date
	agreement: text("agreement").notNull(), // Agreement Details
	milestones: integer("milestones").notNull(), // Number of Milestones
	timeline: jsonb("timeline").notNull(),
	approvalStatus: text("approval_status", {
		enum: ["pending", "rejected", "accepted"],
	})
		.notNull()
		.default("pending"),
	paymentStatus: text("payment_status", {
		enum: ["pending", "completed", "failed"],
	}).default("pending"),
	approvedBy: text("approved_by").references(() => user.id), // ID of the approving party
	updatedAt: timestamp("updated_at").notNull().defaultNow(), // Last update timestamp
});

export const schema = {
	user,
	session,
	account,
	contract,
};
export const ContractSchema = createInsertSchema(contract).extend({
	creationDate: z.string().transform((date) => new Date(date)), // Auto-convert to Date
	expirationDate: z.string().transform((date) => new Date(date)), // Auto-convert to Date
});
