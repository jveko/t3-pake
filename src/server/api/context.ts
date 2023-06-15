import type { GetServerSidePropsContext } from "next";
import type { NextRequest } from "next/server";
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
  req: NextRequest | GetServerSidePropsContext["req"] | null;
};

export const createContextInner = (opts: CreateContextOptions) => {
  return {
    auth: opts.auth,
    req: opts.req,
    db,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const auth = getAuth(opts.req);
  const inner = createContextInner({
    auth,
    req: opts.req,
  });
  const user = await inner.db
    .select()
    .from(users)
    .where(eq(users.external_id, auth.userId ?? ""))
    .limit(1);
  console.log(user);
  return {
    ...inner,
    user: user.length > 0 ? user[0] : null,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
