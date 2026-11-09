import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import test from "node:test";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  lastname:text(),
  email: text().notNull().unique(),
  line:text()
});


export const titleTable = sqliteTable("title_tale",{
    id:int().primaryKey({autoIncrement:true}),
    name:text().notNull()
});

export const dataTable = sqliteTable("data_table",{
    id:int().primaryKey({autoIncrement:true}),
    title:text().notNull(),
    name:text().notNull(),
    lastname:text().notNull(),
    departmant:text().notNull(),
    desc:text().notNull(),
    line:text()
});