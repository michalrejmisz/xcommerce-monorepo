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

type EditCategoryProps = {
  category: ProductCategory;
  onSave: (category: ProductCategory) => void;
};

const ProductCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Nazwa jest wymagana"),
  parentId: z.number().nullable(),
  path: z.string(),
  level: z.number(),
});

const EditProductCategoryForm: React.FC<EditCategoryProps> = ({
  category,
  onSave,
}) => {
  const methods = useForm<ProductCategory>({
    resolver: zodResolver(ProductCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      parentId: category.parentId,
      path: category.path,
      level: category.level,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: CreateCategoryProps },
  } = methods;

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);

  const handleFormSubmit: SubmitHandler<ProductCategory> = (data) => {
    onSave(data);
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" onClick={handleOpen}>
          Edytuj
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOverlayClick={handleClose}>
        <DialogHeader>
          <DialogTitle>Edytuj kategorię</DialogTitle>
          <DialogDescription>Wprowadź nazwę kategorii</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleFormSubmit)}
              className="space-y-8"
            >
              <FormField
                control={methods.control}
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

export default EditProductCategoryForm;
