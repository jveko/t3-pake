import { mysqlTable, mysqlSchema, AnyMySqlColumn, serial, varchar, text, timestamp, uniqueIndex, json, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const notes = mysqlTable("notes", {
	id: serial("id").primaryKey().notNull(),
	userId: varchar("user_id", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	title: text("title").notNull(),
	text: text("text").default(sql`('')`),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow().notNull(),
});

export const users = mysqlTable("users", {
	id: serial("id").primaryKey().notNull(),
	externalId: varchar("external_id", { length: 255 }).notNull(),
	data: json("data"),
	isDeleted: tinyint("is_deleted").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		externalIdIdx: uniqueIndex("external_id_idx").on(table.externalId),
	}
});