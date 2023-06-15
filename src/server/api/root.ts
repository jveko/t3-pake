import { cartRouter } from "./routers/cart";
import { collectionRouter } from "./routers/collection";
import { exampleRouter } from "./routers/example";
import { imageRouter } from "./routers/image";
import { productRouter } from "./routers/product";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  image: imageRouter,
  product: productRouter,
  user: userRouter,
  collection: collectionRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
