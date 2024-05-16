import { z } from "zod";
import { ProductCategory } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ProductSchema } from "@acme/validators";
import { uploadToCloudinary } from "@acme/utils";


export const productRouter = createTRPCRouter({
    create: publicProcedure.input(ProductSchema).mutation(async ({ ctx, input }) => {
      try {
        // Upload images to Cloudinary and get their URLs
        const imageUploadPromises = (input.images ?? []).map(async (file) => {
          const result = await uploadToCloudinary(file, "products");
          return result.url;
        });
        const uploadedImageUrls = await Promise.all(imageUploadPromises);
  
        // Determine the main image URL
        const mainImageUrl = uploadedImageUrls[input.mainImageIndex];
  
        // Create product
        const product = await ctx.prisma.product.create({
          data: {
            name: input.name,
            description: input.description,
            categoryId: input.categoryId,
            price: input.price,
            mainImageUrl: mainImageUrl, // Set the main image URL
            images: {
              create: uploadedImageUrls.map((url) => ({ url })),
            },
          },
        });
  
        console.log("Product created ", product);
        return product;
      } catch (error) {
        console.error("Failed to upload images or create product:", error);
        throw new Error("Image upload or product creation failed");
      }
    
    }),
});