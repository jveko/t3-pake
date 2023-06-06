import {exampleRouter} from "~/server/api/routers/example";
import {createTRPCRouter} from "~/server/api/trpc";
import {stripeRouter} from "~/server/api/routers/stripe";
import {productRouter} from "~/server/api/routers/product";
import {userRouter} from "~/server/api/routers/user";
import {collectionRouter} from "~/server/api/routers/collection";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  stripe: stripeRouter,
  product: productRouter,
  user: userRouter,
  collection:collectionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
