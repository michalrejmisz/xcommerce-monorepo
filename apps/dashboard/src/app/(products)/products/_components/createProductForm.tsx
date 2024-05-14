"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Product, ProductSchema } from "@acme/validators";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

// import cloudinary from "~/utils/cloudinary";

interface IFormInput extends Product {
  imageUrl: FileList | null;
}

export const CreateProductForm = ({ onSubmitForm }) => {
  const productForm = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      categoryId: 76,
      // imageUrl: null,
    },
  });
  const fileRef = productForm.register("imageUrl");

  const onSubmit: SubmitHandler<Product> = async (data) => {
    console.log("----- start form ----");
    console.log(data);
    console.log(data.imageUrl);
    if (data.imageUrl && data.imageUrl.length > 0) {
      const file = data.imageUrl[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64data = reader.result;
          const formData = {
            ...data,
            imageUrl: base64data, // Add the base64 image data to the formData
          };

          // Now send the complete formData including the image to your TRPC mutation
          const newProduct = onSubmitForm(formData);
          console.log("---- form submitted successfully ----", newProduct);
        } catch (error) {
          console.error("Failed during the form submission:", error);
        }
      };
    }
    // Place to upload image to cloudinary
    // const result = await cloudinary.uploader.upload(data.imageUrl);
    // onSubmitForm(data);
    console.log("---- end form---");
  };

  return (
    <Card>
      <Form {...productForm}>
        <h1>Create Product Form</h1>
        <form onSubmit={productForm.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={productForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={productForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productForm.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      {...fileRef}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Dodaj</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
