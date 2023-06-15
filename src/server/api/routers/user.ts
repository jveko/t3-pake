import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        externalId: z.string(),
      })
    )
    .query(async ({ input, ctx: { db } }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.external_id, input.externalId))
        .limit(1);
      if (user.length > 0) {
        return user[0];
      }
      return null;
    }),
  isAdmin: publicProcedure
    .input(
      z.object({
        externalId: z.string().optional().nullable(),
      })
    )
    .query(async ({ input, ctx: { db } }) => {
      if (input.externalId == null || input.externalId == undefined)
        return false;
      const user = await db
        .select()
        .from(users)
        .where(eq(users.external_id, input.externalId))
        .limit(1);
      if (user.length > 0) {
        return user[0]?.role === "admin";
      }
      return false;
    }),
});
