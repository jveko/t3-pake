import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { editProductSchema } from "~/app/(admin)/admin/products/[id]/edit-product";
import { createProductSchema } from "~/app/(admin)/admin/products/create/create-product";
import { slugify } from "~/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Product, collections, products } from "~/server/db/schema";

export const productRouter = createTRPCRouter({
  getProductsByFilter: publicProcedure
    .input(
      z.object({
        collectionId: z.number().optional(),
      })
    )
    .query(async ({ input: i, ctx: { db } }) => {
      var query = db.select().from(products);
      if (i.collectionId) {
        query = query.where(eq(products.collection_id, i.collectionId));
      }
      return (await query) as Product[];
    }),
  getHome: publicProcedure.query(async ({ ctx: { db, user } }) => {
    return (await db.select().from(products).limit(4)) as Product[];
  }),
  getProducts: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    return await db
      .select()
      .from(products)
      .leftJoin(collections, eq(collections.id, products.collection_id));
  }),
  createProduct: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const result = await db.insert(products).values({
        name: input.name,
        slug: slugify(input.name),
        collection_id: Number(input.collectionId),
        stock: input.stock,
        price: input.price.toString(),
        description: input.description,
        images: input.images,
        created_by: user.id,
        updated_by: user.id,
      });
      return result;
    }),
  getProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx: { db, user } }) => {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.id, input.id))
        .limit(1);
      if (result.length > 0) {
        return result[0];
      }
      return null;
    }),
  getProductBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().nullish().optional(),
      })
    )
    .query(async ({ input, ctx: { db, user } }) => {
      if (input.slug == null) return null;
      const result = await db
        .select()
        .from(products)
        .where(eq(products.slug, input.slug))
        .limit(1);
      if (result.length > 0) {
        return result[0] as Product;
      }
      return null;
    }),
  editProduct: protectedProcedure
    .input(editProductSchema)
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      console.log(input);
      const result = await db
        .update(products)
        .set({
          name: input.name,
          slug: slugify(input.name),
          collection_id: Number(input.collectionId),
          stock: input.stock,
          price: input.price.toString(),
          description: input.description,
          images: input.images,
          updated_by: user.id,
        })
        .where(eq(products.id, input.id));
      return result;
    }),
  deleteProduct: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input: i, ctx: { auth, db, user } }) => {
      // const product = await db
      //   .select({
      //     images: products.images,
      //   })
      //   .from(products)
      //   .where(eq(products.id, i.id))
      //   .limit(1);
      // if (product.length == 0 || product[0] == null) {
      //   return;
      // }
      // for (let index = 0; index < (product[0].images as {
      //   fileUrl: string;
      //   fileKey: string;
      // }[]).length; index++) {
      //   [
      // }
      // for (var image in ) {
      //   image;
      // }
      const result = await db.delete(products).where(eq(products.id, i.id));
      return result;
    }),
  count: publicProcedure
    .input(
      z.object({
        collectionId: z.number().optional(),
      })
    )
    .query(async ({ input: i, ctx: { db } }) => {
      var query = db.select({ count: sql<number>`count(*)` }).from(products);
      if (i.collectionId) {
        query = query.where(eq(products.collection_id, i.collectionId));
      }
      const result = await query;
      if (result.length > 0) return result[0]!.count;
      return 0;
    }),
});
