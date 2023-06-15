import { type NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { eq } from "drizzle-orm";
import { env } from "~/env.mjs";
import { createContextInner } from "~/server/api/context";
import { appRouter } from "~/server/api/root";
import { users } from "~/server/db/schema";

export default function handler(req: NextRequest) {
  return fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    async createContext() {
      const auth = getAuth(req);
      const inner = createContextInner({
        auth,
        req,
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
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
}

export const runtime = "experimental-edge";
