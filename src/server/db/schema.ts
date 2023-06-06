import { InferModel } from "drizzle-orm";
import { AnyMySqlColumn, uniqueIndex } from "drizzle-orm/mysql-core";
import {
  boolean,
  decimal,
  int,
  json,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core/columns";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

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
      externalIdIndex: uniqueIndex("external_id_index").on(table.external_id),
    };
  }
);
export const collections = mysqlTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name"),
  parent_id: int("parent_id").references((): AnyMySqlColumn => collections.id),
  created_at: timestamp("created_at").defaultNow(),
  created_by: int("created_by")
    .notNull()
    .references(() => users.id),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
  updated_by: int("updated_by")
    .notNull()
    .references(() => users.id),
});
export type Collection = InferModel<typeof collections>;
export type CollectionWithParent = Collection & {
  parent: Collection;
};
export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  collection_id: int("collection_id")
    .notNull()
    .references(() => collections.id),
  name: text("name"),
  stock: decimal("stock").default("0"),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  description: text("description"),
  images: json("images"),
});
export type Product = InferModel<typeof products>;
// export const productVariants = mysqlTable("product_variants", {
//   id: serial("id").primaryKey(),
//   product_id: int("product_id").notNull().references(() => products.id),
//   type_product: text('type_product', {enum: ["apparel", "shoes"]})
// });
// export type ProductVariants = InferModel<typeof productVariants>;
// export const apparel = mysqlTable("apparel", {
//   id: serial("id").primaryKey(),
//   product_id: int("product_id").notNull().references(() => products.id),
//   stock: decimal("inventory").default("0"),
//   price: decimal("price", {precision: 10, scale: 2}).default("0"),
//   description: text("description"),
//   images: json("images"),
// });
// export type Apparel = InferModel<typeof apparel>;
export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  owner_id: int("owner_id")
    .notNull()
    .references(() => users.id),
  product_id: int("product_id")
    .notNull()
    .references(() => products.id),
});

export type Cart = InferModel<typeof carts>;
