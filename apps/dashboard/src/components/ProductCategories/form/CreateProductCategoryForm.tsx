"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { ProductCategory } from "@acme/db";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type CreateCategoryProps = {
  parent: ProductCategory["parentId"];
  onSave: (category: Omit<ProductCategory, "id">) => void;
};

type ProductCategoryFormValues = Omit<ProductCategory, "id" | "children">;

const ProductCategorySchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  parentId: z.number().nullable(),
  path: z.string(),
  level: z.number(),
});

const CreateProductCategoryForm: React.FC<CreateCategoryProps> = ({
  parent,
  onSave,
}) => {
  const formMethods = useForm<ProductCategoryFormValues>({
    resolver: zodResolver(ProductCategorySchema),
    defaultValues: {
      name: "",
      parentId: parent ?? null,
      level: 0,
      path: "test",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
    formMethods.reset();
  };

  const handleOpen = () => setIsOpen(true);

  const handleFormSubmit: SubmitHandler<ProductCategoryFormValues> = (data) => {
    onSave(data);
    formMethods.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-background/70 m-2 w-40 p-6"
          onClick={handleOpen}
        >
          Dodaj Kategorię
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOverlayClick={handleClose}>
        <DialogHeader>
          <DialogTitle>Dodaj kategorię</DialogTitle>
          <DialogDescription>Wprowadź nazwę kategorii</DialogDescription>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <Form {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(handleFormSubmit)}
              className="space-y-8"
            >
              <FormField
                control={formMethods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Laptop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  className="bg-secondary mr-1"
                  onClick={handleClose}
                >
                  Zamknij
                </Button>
                <Button type="submit">Dodaj</Button>
              </DialogFooter>
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductCategoryForm;
