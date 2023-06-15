import { type InferModel } from "drizzle-orm";
import {
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

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    external_id: varchar("external_id", { length: 255 }).notNull(),
    data: json("data"),
    is_deleted: boolean("is_deleted").default(false),
    role: text("role", { enum: ["user", "admin"] })
      .notNull()
      .default("user"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      users_external_id_idx: uniqueIndex("users_external_id_idx").on(
        table.external_id
      ),
    };
  }
);
export type User = InferModel<typeof users>;
export const collections = mysqlTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 256 }).notNull(),
    parent_id: int("parent_id"),
    created_at: timestamp("created_at").defaultNow(),
    created_by: int("created_by").notNull(),
    updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
    updated_by: int("updated_by").notNull(),
  },
  (table) => {
    return {
      collections_slug_idx: uniqueIndex("collections_slug_idx").on(table.slug),
    };
  }
);
export type Collection = InferModel<typeof collections>;
export type CollectionSelectable = Omit<
  Collection,
  "created_at" | "created_by" | "updated_at" | "updated_by" | "parent_id"
>;
export const products = mysqlTable(
  "products",
  {
    id: serial("id").primaryKey(),
    collection_id: int("collection_id").notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 256 }).notNull(),
    stock: int("stock").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    description: text("description").notNull(),
    images: json("images").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    created_by: int("created_by").notNull(),
    updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
    updated_by: int("updated_by").notNull(),
  },
  (table) => {
    return {
      products_slug_idx: uniqueIndex("products_slug_idx").on(table.slug),
    };
  }
);
// export type Product = InferModel<typeof products>
export type Product = {
  [K in keyof InferModel<typeof products>]: K extends "images"
    ? {
        fileUrl: string;
        fileKey: string;
      }[]
    : InferModel<typeof products>[K];
};
export const carts = mysqlTable(
  "carts",
  {
    id: serial("id").primaryKey(),
    owner_id: int("owner_id").notNull(),
    product_id: int("product_id").notNull(),
    qty: int("qty").notNull(),
  },
  (table) => {
    return {
      carts_owner_id_and_product_id: uniqueIndex(
        "carts_owner_id_and_product_id"
      ).on(table.owner_id, table.product_id),
    };
  }
);
export type Cart = InferModel<typeof carts>;

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  owner_id: int("owner_id").notNull(),
  qty: int("qty").notNull(),
});

export const orderItems = mysqlTable("order_items", {
  id: serial("id").primaryKey(),
  owner_id: int("owner_id").notNull(),
  qty: int("qty").notNull(),
});
export type Orders = InferModel<typeof orders>;
