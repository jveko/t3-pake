import { utapi } from "uploadthing/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(
      z.object({
        key: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx: { db } }) => {
      const { success } = await utapi.deleteFiles(input.key);
      return {
        success,
        key: input.key,
      };
    }),
});
