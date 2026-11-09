import { sql } from "drizzle-orm";
import { int, sqliteTable, text} from "drizzle-orm/sqlite-core";
import test from "node:test";

// export const usersTable = sqliteTable("users_table", {
//   id: int().primaryKey({ autoIncrement: true }),
//   name: text().notNull(),
//   lastname:text(),
//   email: text().notNull().unique(),
//   line:text()
// });


// export const titleTable = sqliteTable("title_tale",{
//     id:int().primaryKey({autoIncrement:true}),
//     name:text().notNull()
// });

export const repairRequests = sqliteTable("repair_requests", {
  id: int().primaryKey(),
  title: text().notNull(),
  firstname: text().notNull(),
  lastname: text().notNull(),
  email: text().notNull(),
  lineId: text().notNull(),
  description: text(),
  createdAt: text("created_at").notNull(),
});