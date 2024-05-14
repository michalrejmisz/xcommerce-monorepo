import { z } from "zod";
import { ProductCategory } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ProductSchema } from "@acme/validators";
import { uploadToCloudinary } from "@acme/utils";


export const productRouter = createTRPCRouter({
    create: publicProcedure.input(ProductSchema).mutation(async ({ ctx, input }) => {
        try {
            const result = await uploadToCloudinary(input.imageUrl);
              const product = await ctx.prisma.product.create({
              data: {
                  name: input.name,
                  description: input.description,
                  categoryId: input.categoryId,
                  price: input.price,
                  imageUrl: result.url,
              }})
              console.log("Product created ", product)
          } catch (error) {
            console.error("Failed to upload image:", error);
            throw new Error("Image upload failed");
          }

    
    }),
});