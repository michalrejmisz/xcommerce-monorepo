import { z } from "zod";
import { SpecificationTemplateGroup } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


const optionFieldSchema = z.object({
    option: z.string().min(1),
  });
  
const formSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    isGlobal: z.boolean(),
    categoryId: z.number(),
    dynamicTextInputFields: z.array(
        z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string(),
        }),
    ),
    dynamicDropdownFields: z.array(
        z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string(),
        isMultipleChoice: z.boolean(),
        options: z.array(optionFieldSchema),
        }),
    ),
});

export const specificationTemplateRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.specificationTemplateGroup.findMany({
        include: {
          category: true,
        }
      });
    }),

    create: publicProcedure
      .input(formSchema)
      .mutation(async ({ ctx, input }) => {
        return await ctx.prisma.$transaction(async (prisma) => {
          const specificationTemplateGroup = await prisma.specificationTemplateGroup.create({
            data: {
              name: input.name,
              description: input.description,
              isGlobal: input.isGlobal,
              categoryId: input.categoryId || null,
              templates: {
                create: [
                  ...input.dynamicTextInputFields.map((field) => ({
                    key: field.name,
                    description: field.description,
                  })),
                  ...input.dynamicDropdownFields.map((dropdownField) => ({
                    key: dropdownField.name,
                    description: dropdownField.description,
                    // isMultipleChoice: dropdownField.isMultipleChoice,
                    options: {
                      create: dropdownField.options.map(option => ({
                        isMultipleChoice: dropdownField.isMultipleChoice,
                        value: option.option.trim(),
                      })),
                    },
                  })),
                ],
              },
            },
          });
  
          return specificationTemplateGroup;
        });
      }),
  })

