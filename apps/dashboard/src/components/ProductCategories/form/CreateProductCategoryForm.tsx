// import React, { useEffect, useState } from "react";
// // import { FormButton, FormContainer, FormInput } from "@/admin/components/form";
// // import { Modal } from "@/common/components/UI/Modal";
// // import { useModal } from "@/common/hooks/useModal";
// // import { ProductCategory } from "@/types/global";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";

// import { ProductCategory } from "@acme/db";

// import { Button } from "~/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";

// type CreateCategoryProps = {
//   parent: ProductCategory["parentId"];
//   onSave: (category: Omit<ProductCategory, "id">) => void;
// };

// type ProductCategoryFormValues = Omit<ProductCategory, "id" | "children">;

// const schema = z.object({
//   name: z.string().min(1, "Nazwa jest wymagana"),
//   parentId: z.number().nullable(),
//   path: z.string(),
//   level: z.number(),
// });

// export const CreateProductCategoryForm: React.FC<CreateCategoryProps> = ({
//   parent,
//   onSave,
// }) => {
//   const methods = useForm<ProductCategoryFormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       parentId: parent ?? null,
//       level: 0,
//       path: "test",
//     },
//   });

//   const handleClose = () => {
//     methods.reset();
//   };

//   const onSubmit: SubmitHandler<ProductCategoryFormValues> = (data) => {
//     console.log("SUBMIT");
//     onSave(data);
//     handleClose();
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Dodaj Kategorię</Button>
//       </DialogTrigger>
//       <FormProvider {...methods}>
//         <div
//           className="grid gap-4 py-4"
//           onSubmit={methods.handleSubmit(onSubmit)}
//         >
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Dodaj kategorię</DialogTitle>
//               <DialogDescription>Wprowadź nazwę kategorii</DialogDescription>
//             </DialogHeader>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Nazwa
//               </Label>
//               <Input id="name" name="name" value="" className="col-span-3" />
//             </div>
//             <DialogFooter>
//               <Button type="submit">Dodaj</Button>
//             </DialogFooter>
//           </DialogContent>
//         </div>
//       </FormProvider>
//     </Dialog>
//   );
// };

import React from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type CreateCategoryProps = {
  parent: ProductCategory["parentId"];
  onSave: (category: Omit<ProductCategory, "id">) => void;
};

type ProductCategoryFormValues = Omit<ProductCategory, "id" | "children">;

const schema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  parentId: z.number().nullable(),
  path: z.string(),
  level: z.number(),
});

export const CreateProductCategoryForm: React.FC<CreateCategoryProps> = ({
  parent,
  onSave,
}) => {
  const methods = useForm<ProductCategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      parentId: parent ?? null,
      level: 0,
      path: "test",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: CreateCategoryProps },
  } = methods;

  const onSubmit: SubmitHandler<ProductCategoryFormValues> = (data) => {
    console.log("SUBMIT", data);
    onSave(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dodaj Kategorię</Button>
      </DialogTrigger>
      <FormProvider {...methods}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj kategorię</DialogTitle>
            <DialogDescription>Wprowadź nazwę kategorii</DialogDescription>
          </DialogHeader>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nazwa
                </Label>
                <Input id="name" {...register("name")} className="col-span-3" />
              </div>
              <DialogFooter className="gap-1">
                <DialogClose>
                  <Button
                    variant="outline"
                    className="bg-secondary"
                    type="reset"
                  >
                    Zamknij
                  </Button>
                </DialogClose>
                <Button type="submit">Dodaj</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
};
