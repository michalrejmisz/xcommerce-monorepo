import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { productCategory } from "./router/productCategory";
import { specificationTemplateRouter } from "./router/specification/deprecated - template";
import { specificationTemplateAllRouter } from "./router/specification/specificationTemplateAll";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  productCategory: productCategory,
  specifications: specificationTemplateAllRouter,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;
