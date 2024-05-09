import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
import { Switch } from "~/components/ui/switch";
import { DynamicDropdownField } from "./DynamicDropdownField";
import { DynamicTextInputField } from "./DynamicTextInputField";

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

type FormData = z.infer<typeof formSchema>;

export const SpecificationFormBuilder = ({ onSubmitForm }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isGlobal: false,
      categoryId: 0,
      dynamicTextInputFields: [],
      dynamicDropdownFields: [],
    },
  });

  const {
    fields: textInputFields,
    append: appendTextInputField,
    remove: removeTextInputField,
  } = useFieldArray({
    control: form.control,
    name: "dynamicTextInputFields",
  });

  const {
    fields: dropdownInputFields,
    append: appendDropdownField,
    remove: removeDropdownField,
  } = useFieldArray({
    control: form.control,
    name: "dynamicDropdownFields",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("----- start form ----");
    console.log(data);
    onSubmitForm(data);
    console.log("---- end form---");
  };

  // name / description / isGlobal / categoryId
  return (
    <>
      <h2>Formularz!</h2>
      <Card>
        {/* <CardHeader>
          <CardTitle>Specyfikacja Produktu</CardTitle>
        </CardHeader> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-4">
              <Card className="bg-slate-600/20">
                <CardHeader>Podstawowe Informacje</CardHeader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
              {textInputFields?.map((field, index) => (
                <DynamicTextInputField
                  key={field.id}
                  control={form.control}
                  index={index}
                  remove={removeTextInputField}
                />
              ))}
              {dropdownInputFields.map((field, index) => (
                <DynamicDropdownField
                  key={field.id}
                  control={form.control}
                  index={index}
                  remove={removeDropdownField}
                />
              ))}
            </CardContent>
            <CardFooter className="space-x-2 self-end">
              <Button
                type="button"
                onClick={() =>
                  appendTextInputField({
                    id: `textInputField_${textInputFields.length}`,
                    name: "",
                    description: "",
                  })
                }
              >
                Dodaj pole
              </Button>
              <Button
                type="button"
                onClick={() =>
                  appendDropdownField({
                    id: `dropdownField_${dropdownInputFields.length}`,
                    name: "",
                    description: "",
                    isMultipleChoice: false,
                    options: [{ option: "" }],
                  })
                }
              >
                Dodaj pole selekcji
              </Button>
              <Button type="submit">Zapisz Templatkę</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};
