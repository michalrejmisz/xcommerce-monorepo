import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { productCategory } from "./router/productCategory";
import { productRouter } from "./router/product";
import { specificationTemplateRouter } from "./router/specificationTemplate";
// import { specificationTemplateAllRouter } from "./router/specification/specificationTemplateAll";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  productCategory: productCategory,
  specifications: specificationTemplateRouter,
  product: productRouter,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;
