import { collectionRouter } from "~/server/api/routers/collection";
import { exampleRouter } from "~/server/api/routers/example";
import { productRouter } from "~/server/api/routers/product";
import { stripeRouter } from "~/server/api/routers/stripe";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

import { imageRouter } from "./routers/image";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  image: imageRouter,
  stripe: stripeRouter,
  product: productRouter,
  user: userRouter,
  collection: collectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
