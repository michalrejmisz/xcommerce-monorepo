import { z } from "zod";
import { ProductCategory } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ProductSchema } from "@acme/validators";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true // Use HTTPS for URL and images
});

// export default cloudinary;


export async function uploadToCloudinary(fileStr: string) {
  return cloudinary.uploader.upload(fileStr, {
    folder: 'product_images'
  });
}


export const productRouter = createTRPCRouter({
    create: publicProcedure.input(ProductSchema).mutation(async ({ ctx, input }) => {
        // const result = await cloudinary.uploader.upload(input.imageUrl);
        console.log("----Procedure----")
        console.log(input.imageUrl)
        console.log("---- End Procedure----")
        try {
            // const fileStr = input.imageUrl[0]; // The image file as a base64 string
            const result = await uploadToCloudinary(input.imageUrl);
            return result.url;
          } catch (error) {
            console.error("Failed to upload image:", error);
            throw new Error("Image upload failed");
          }

      const product = await ctx.prisma.product.create({
        data: {
            name: input.name,
            description: input.description,
            categoryId: input.categoryId,
            price: input.price,
        },
    });
    console.log("Product created ", product)
    }),
});