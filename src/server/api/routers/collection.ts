import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { z } from "zod";
import { editCollectionsSchema } from "~/app/(admin)/admin/collections/[id]/edit-collection";
import { createCollectionSchema } from "~/app/(admin)/admin/collections/create/create-collection";
import { slugify } from "~/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  collections,
  type Collection,
  type CollectionSelectable,
} from "~/server/db/schema";

export const collectionRouter = createTRPCRouter({
  getCollectionBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      })
    )
    .query(async ({ input, ctx: { db } }) => {
      const result = await db
        .select()
        .from(collections)
        .where(eq(collections.slug, input.slug))
        .limit(1);
      if (result.length > 0) {
        return result[0] as Collection;
      }
      return undefined;
    }),
  getMenu: publicProcedure.query(async ({ ctx: { db } }) => {
    return (await db
      .select({
        name: collections.name,
        slug: collections.slug,
      })
      .from(collections)) as Collection[];
  }),
  getCollections: publicProcedure.query(async ({ ctx: { db } }) => {
    const parent = alias(collections, "parent");
    return await db
      .select()
      .from(collections)
      .leftJoin(parent, eq(parent.id, collections.parent_id));
  }),
  getCollectionsSelectable: publicProcedure.query(async ({ ctx: { db } }) => {
    return (await db
      .select({
        id: collections.id,
        name: collections.name,
      })
      .from(collections)) as CollectionSelectable[];
  }),
  getCollection: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx: { db } }) => {
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
    .mutation(async ({ input, ctx: { db, user } }) => {
      const parentId =
        input.parentId && !Number.isNaN(input.parentId)
          ? Number(input.parentId)
          : undefined;

      const result = await db.insert(collections).values({
        name: input.name,
        slug: slugify(input.name),
        parent_id: parentId,
        created_by: user.id,
        updated_by: user.id,
      });
      return result;
    }),
  editCollection: protectedProcedure
    .input(editCollectionsSchema)
    .mutation(async ({ input, ctx: { db, user } }) => {
      const parentId =
        input.parentId && !Number.isNaN(input.parentId)
          ? Number(input.parentId)
          : undefined;
      const result = await db
        .update(collections)
        .set({
          name: input.name,
          slug: slugify(input.name),
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
    .mutation(async ({ input, ctx: { db } }) => {
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
