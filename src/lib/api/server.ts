import { auth as getAuth } from "@clerk/nextjs/app-beta";
import superjson from "superjson";
import { createTRPCNextLayout } from "~/@trpc/next-layout/server";

import "server-only";
import { eq } from "drizzle-orm";
import { createContextInner } from "~/server/api/context";
import { appRouter } from "~/server/api/root";
import { users } from "~/server/db/schema";

export const api = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  async createContext() {
    const auth = getAuth();
    const inner = createContextInner({
      auth,
      req: null,
    });
    const user = await inner.db
      .select()
      .from(users)
      .where(eq(users.external_id, auth.userId ?? ""))
      .limit(1);
    return {
      ...inner,
      user: user.length > 0 ? user[0] : null,
    };
  },
});
