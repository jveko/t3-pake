import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import {z} from "zod"
import {users} from "~/server/db/schema";
import {eq} from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        externalId: z.string().min(1)
      })
    )
    .query(async ({input, ctx: {auth, db}}) => {
      const user = await db.select().from(users).where(eq(users.external_id, input.externalId)).limit(1)
      if (user.length > 0) {
        return user[0]
      }
      return null;
    }),
  isAdmin: publicProcedure
    .input(
      z.object({
        externalId: z.string().min(1)
      })
    )
    .query(async ({input, ctx: {auth, db}}) => {
      const user = await db.select().from(users).where(eq(users.external_id, input.externalId)).limit(1)
      if (user.length > 0) {
        return user[0]?.role === "admin"
      }
      return false;
    }),
});
