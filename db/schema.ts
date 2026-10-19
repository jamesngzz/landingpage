import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const betaSignups = sqliteTable("beta_signups", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  need: text("need").notNull(),
  tools: text("tools_json").notNull(),
  language: text("language").notNull(),
  demo: text("demo_json").notNull(),
  consentVersion: text("consent_version").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
