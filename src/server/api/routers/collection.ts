import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { z } from "zod";
import { editCollectionsSchema } from "~/app/(admin)/admin/collections/[id]/edit-collection";
import { createCollectionSchema } from "~/app/(admin)/admin/collections/create/create-collection";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  Collection,
  CollectionWithParent,
  collections,
} from "~/server/db/schema";

export const collectionRouter = createTRPCRouter({
  getCollections: publicProcedure.query(async ({ ctx: { db, user } }) => {
    const parent = alias(collections, "parent");
    return await db
      .select()
      .from(collections)
      .leftJoin(parent, eq(parent.id, collections.parent_id));
  }),
  getCollectionsSelectable: publicProcedure.query(
    async ({ ctx: { db, user } }) => {
      return await db.select().from(collections);
    }
  ),
  getCollection: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx: { db, user } }) => {
      const result = await db
        .select()
        .from(collections)
        .where(eq(collections.id, input.id))
        .limit(1);
      if (result.length > 0) {
        return result[0];
      }
      return null;
    }),
  createCollection: protectedProcedure
    .input(createCollectionSchema)
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const parentId =
        input.parentId && !Number.isNaN(input.parentId)
          ? Number(input.parentId)
          : undefined;

      const result = await db.insert(collections).values({
        name: input.name,
        parent_id: parentId,
        created_by: user.id,
        updated_by: user.id,
      });
      return result;
    }),
  editCollection: protectedProcedure
    .input(editCollectionsSchema)
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const parentId =
        input.parentId && !Number.isNaN(input.parentId)
          ? Number(input.parentId)
          : undefined;
      const result = await db
        .update(collections)
        .set({
          name: input.name,
          parent_id: parentId,
          updated_by: user.id,
        })
        .where(eq(collections.id, input.id));
      return result;
    }),
  deleteCollection: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx: { auth, db, user } }) => {
      const result = await db
        .delete(collections)
        .where(eq(collections.id, input.id));
      return result;
    }),
  // editNote: protectedProcedure
  //   .input(editNoteSchema)
  //   .mutation(async ({input, ctx: {db}}) => {
  //     const result = await db
  //       .update(notes)
  //       .set({
  //         title: input.title,
  //         text: input.text,
  //       })
  //       .where(eq(notes.id, input.id));
  //     return result;
  //   }),
});
