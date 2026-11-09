import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const repairRequests = sqliteTable("repair_requests", {
  id: int().primaryKey({ autoIncrement: true }),
  ticketCode: text("ticket_code").notNull().default(""),
  title: text().notNull(),
  category: text().notNull().default("other"),
  location: text().notNull().default(""),
  priority: text().notNull().default("normal"),
  status: text().notNull().default("pending"),
  firstname: text().notNull(),
  lastname: text().notNull(),
  email: text().notNull(),
  lineId: text().notNull(),
  description: text(),
  adminNote: text("admin_note").notNull().default(""),
  assignedTechId: int("assigned_tech_id"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull().default(""),
});

export const technicians = sqliteTable("technicians", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text().notNull(),
  createdAt: text("created_at").notNull(),
});

export const sessions = sqliteTable("sessions", {
  token: text().primaryKey(),
  techId: int("tech_id").notNull(),
  expiresAt: text("expires_at").notNull(),
});
