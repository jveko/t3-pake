import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createNoteSchema } from "~/app/dashboard/create-note";
import { editNoteSchema } from "~/app/dashboard/edit-note";
import { slugify } from "~/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes } from "~/server/db/schema";
import stripe from "stripe";

export const strapiRouter = createTRPCRouter({
  createPaymentIntent: protectedProcedure.query(({ ctx: { auth, db } }) => {
    const data = db
      .select()
      .from(notes)
      .where(eq(notes.user_id, auth.userId))
      .orderBy(desc(notes.created_at));
    return data;
  }),
});
