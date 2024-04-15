import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { productCategory } from "./router/productCategory";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  productCategory: productCategory,
});

// export type definition of API
export type AppRouter = typeof appRouter;
