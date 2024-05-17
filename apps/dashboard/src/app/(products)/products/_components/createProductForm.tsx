"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Product, ProductSchema } from "@acme/validators";

import { PhotoUpload } from "~/components/photoUpload";
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
import { cn } from "~/lib/utils";
import { convertArrayToFileList, convertToBase64 } from "~/utils/imageUtils";
import { CategoryList } from "./categoryList";

export const CreateProductForm = ({ onSubmitForm }) => {
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

  const productForm = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [],
      mainImageIndex: 0,
      categoryId: "",
    },
  });

  const onSubmit: SubmitHandler<Product> = async (data) => {
    console.log("Form data:", data.images);
    let imageBase64Strings = [];
    if (data.images.length > 0) {
      imageBase64Strings = await Promise.all(
        Array.from(data.images).map((file: File) => convertToBase64(file)),
      );
    }

    const formData = {
      ...data,
      images: imageBase64Strings,
      mainImageIndex: 0,
    };

    console.log("Form data:", formData);
    try {
      const newProduct = await onSubmitForm(formData);
    } catch (error) {
      console.error("Failed during the form submission:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    productForm.setValue("categoryId", categoryId);
  };

  // const fileInputRef = useRef(null);

  return (
    <Card>
      {/* <CategoryList /> */}
      <Form {...productForm}>
        <h1>Create Product Form</h1>
        <form onSubmit={productForm.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={productForm.control}
              name="name"
              render={({ field }) => (
                <Card className="bg-slate-600/20">
                  <FormItem className="">
                    <FormLabel>Nazwa</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                </Card>
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zdjęcia</FormLabel>
                  <FormControl>
                    <PhotoUpload
                      name={field.name}
                      multiple={true}
                      allowSelectMainImage={true}
                      onMainImageIndexChange={setMainImageIndex}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategoria</FormLabel>
                  <FormControl>
                    <CategoryList onCategoryChange={handleCategoryChange} />
                  </FormControl>
                  <FormMessage />
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
