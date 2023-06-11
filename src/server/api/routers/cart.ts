import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Cart, Product, carts, products } from "~/server/db/schema";

export const cartRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        qty: z.number(),
      })
    )
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const cart = await db
        .select()
        .from(carts)
        .where(
          and(
            eq(carts.owner_id, user.id),
            eq(carts.product_id, input.productId)
          )
        );
      if (cart.length == 0 || cart[0] == null) {
        await db.insert(carts).values({
          owner_id: user.id,
          product_id: input.productId,
          qty: input.qty,
        });
        return;
      }
      await db
        .update(carts)
        .set({
          qty: cart[0].qty + input.qty,
        })
        .where(eq(carts.id, cart[0].id));
      return;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        qty: z.number(),
      })
    )
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const cart = await db.select().from(carts).where(eq(carts.id, input.id));
      if (cart.length == 0 || cart[0] == null) {
        return;
      }
      await db
        .update(carts)
        .set({
          qty: input.qty,
        })
        .where(eq(carts.id, input.id));
      return;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      await db.delete(carts).where(eq(carts.id, input.id));
    }),
  getCart: protectedProcedure.query(async ({ ctx: { auth, db, user } }) => {
    return (await db
      .select()
      .from(carts)
      .innerJoin(products, eq(products.id, carts.product_id))
      .where(eq(carts.owner_id, user.id))) as {
      carts: Cart;
      products: Product;
    }[];
  }),
});
