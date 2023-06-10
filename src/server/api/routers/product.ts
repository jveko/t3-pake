import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { z } from "zod";
import { editCollectionsSchema } from "~/app/(admin)/admin/collections/[id]/edit-collection";
import { createCollectionSchema } from "~/app/(admin)/admin/collections/create/create-collection";
import { editProductSchema } from "~/app/(admin)/admin/products/[id]/edit-product";
import { createProductSchema } from "~/app/(admin)/admin/products/create/create-product";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { collections, products } from "~/server/db/schema";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx: { db, user } }) => {
    return await db
      .select()
      .from(products)
      .innerJoin(collections, eq(collections.id, products.collection_id));
  }),
  createProduct: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const result = await db.insert(products).values({
        name: input.name,
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
  editProduct: protectedProcedure
    .input(editProductSchema)
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      console.log(input);
      const result = await db
        .update(products)
        .set({
          name: input.name,
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
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const result = await db.delete(products).where(eq(products.id, input.id));
      return result;
    }),
});
