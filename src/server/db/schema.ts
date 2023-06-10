import { InferModel } from "drizzle-orm";
import {
  AnyMySqlColumn,
  boolean,
  decimal,
  int,
  json,
  mysqlTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  external_id: varchar("external_id", { length: 255 }).notNull(),
  data: json("data"),
  is_deleted: boolean("is_deleted").default(false),
  role: text("role", { enum: ["user", "admin"] })
    .notNull()
    .default("user"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});
export type User = InferModel<typeof users>;
export const collections = mysqlTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  parent_id: int("parent_id"),
  created_at: timestamp("created_at").defaultNow(),
  created_by: int("created_by").notNull(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
  updated_by: int("updated_by").notNull(),
});
export type Collection = InferModel<typeof collections>;
export type CollectionSelectable = Omit<
  Collection,
  "created_at" | "created_by" | "updated_at" | "updated_by" | "parent_id"
>;
export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  collection_id: int("collection_id").notNull(),
  name: text("name").notNull(),
  stock: int("stock").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  description: text("description").notNull(),
  images: json("images").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  created_by: int("created_by").notNull(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
  updated_by: int("updated_by").notNull(),
});
export type Product = InferModel<typeof products>;
export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  owner_id: int("owner_id").notNull(),
  product_id: int("product_id").notNull(),
});
export type Cart = InferModel<typeof carts>;
