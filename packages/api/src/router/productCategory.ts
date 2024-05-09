import { z } from "zod";
import { ProductCategory } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const productCategory = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productCategory.findMany();
  }),

  add: publicProcedure
        .input(z.object({
        name: z.string().min(1),
        parentId: z.number().nullable(),
        path: z.string(),  
        level: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const category = await ctx.prisma.productCategory.create({ data: { ...input, isLeaf: true } });
        if (input.parentId !== null) {
           await ctx.prisma.productCategory.update({
            where: { id: input.parentId },
            data: { isLeaf: false }
          });
        }
        return category;
      }),

  update: publicProcedure
  .input(z.object({
    id: z.number(),
    name: z.string().min(1),
    parentId: z.number().nullable(),
    path: z.string(),  
    level: z.number(),
  }))
  .mutation(async ({ ctx, input }) => {
    // return ctx.prisma.productCategory.update({ where: { id: input.id }, data: input });
    const existingCategory = await ctx.prisma.productCategory.findUnique({ where: { id: input.id } });
    const updatedCategory = await ctx.prisma.productCategory.update({
      where: { id: input.id },
      data: input
    });

    if (existingCategory?.parentId !== input.parentId) {
      if (existingCategory?.parentId !== null) {
        const siblingCount = await ctx.prisma.productCategory.count({
          where: { parentId: existingCategory?.parentId }
        });
        if (siblingCount === 0) {
          await ctx.prisma.productCategory.update({
            where: { id: existingCategory?.parentId },
            data: { isLeaf: true }
          });
        }
      }
      if (input.parentId !== null) {
        await ctx.prisma.productCategory.update({
          where: { id: input.parentId },
          data: { isLeaf: false }
        });
      }
    }

    return updatedCategory;
  }),    

  delete: publicProcedure.input(z.number()).mutation(async({ ctx, input }) => {
    // return ctx.prisma.productCategory.delete({ where: { id: input } });
    const category = await ctx.prisma.productCategory.findUnique({ where: { id: input } });
    await ctx.prisma.productCategory.delete({ where: { id: input } });
  
    if (category?.parentId !== null) {
      const siblingCount = await ctx.prisma.productCategory.count({
        where: { parentId: category?.parentId }
      });
      if (siblingCount === 0) {
        await ctx.prisma.productCategory.update({
          where: { id: category?.parentId },
          data: { isLeaf: true }
        });
      }
    }
  }),
});
