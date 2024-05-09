// trpc.ts (Continuation of your existing setup)
import { z } from "zod";
import { ProductSpecificationTemplate } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";

export const specificationTemplateRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.productSpecificationTemplate.findMany({
          include: {
            group: true,  // Include group details
            options: true,  // Include option details
            products: {  // Include related products
              select: {
                product: {
                  select: {
                    name: true,
                    description: true,
                    price: true,
                  }
                }
              }
            }
          },
        });
      }),
    
      // Get templates by category ID, including related data
      getByCategoryId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
        return ctx.prisma.productSpecificationTemplate.findMany({
          where: {
            group: {
              categoryId: input
            }
          },
          include: {
            group: true,
            options: true,
          },
        });
      }),

  create: publicProcedure.input(z.object({
    key: z.string(),
    description: z.string().optional(),
    groupId: z.number().optional(),
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.productSpecificationTemplate.create({
      data: input,
    });
  }),

  update: publicProcedure.input(z.object({
    id: z.number(),
    key: z.string(),
    description: z.string().optional(),
    groupId: z.number().optional(),
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.productSpecificationTemplate.update({
      where: { id: input.id },
      data: input,
    });
  }),

  delete: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.productSpecificationTemplate.delete({
      where: { id: input },
    });
  }),
});
