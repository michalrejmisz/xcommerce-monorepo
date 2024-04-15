import { z } from "zod";
import { ProductCategory } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const createProductCategoryInput = z.object({
    name: z.string().min(1),
    parentId: z.number().nullable(),
    path: z.string(),  
    level: z.number(),
});


export const productCategory = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productCategory.findMany();
  }),
//   byId: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .query(({ ctx, input }) => {
//       return ctx.prisma.post.findFirst({ where: { id: input.id } });
//     }),
  add: publicProcedure
    .input(
        createProductCategoryInput
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.productCategory.create({ data: input });
    }),
//   delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
//     return ctx.prisma.post.delete({ where: { id: input } });
//   }),
});
