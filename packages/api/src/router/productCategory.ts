import { z } from "zod";
import { ProductCategory } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
        .input(z.object({
        name: z.string().min(1),
        parentId: z.number().nullable(),
        path: z.string(),  
        level: z.number(),
      }))
      .mutation(({ ctx, input }) => {
        return ctx.prisma.productCategory.create({ data: input });
      }),

  update: publicProcedure
  .input(z.object({
    id: z.number(),
    name: z.string().min(1),
    parentId: z.number().nullable(),
    path: z.string(),  
    level: z.number(),
  }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.productCategory.update({ where: { id: input.id }, data: input });
  }),    

  delete: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.productCategory.delete({ where: { id: input } });
  }),
});
