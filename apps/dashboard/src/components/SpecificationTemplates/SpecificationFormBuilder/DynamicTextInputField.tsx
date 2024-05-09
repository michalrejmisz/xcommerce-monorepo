import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";

// Define Zod schema for a single description
const descriptionFieldSchema = z.object({
  description: z.string(),
});

export const DynamicTextInputField = ({ control, index, remove, key }) => {
  return (
    <Card key={key} className="grid grid-cols-12 gap-4  bg-slate-600/20 ">
      <FormField
        key={key}
        control={control}
        name={`dynamicTextInputFields.${index}.name`}
        render={({ field }) => (
          <FormItem className="col-span-5">
            <FormLabel>Nazwa </FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key={key}
        control={control}
        name={`dynamicTextInputFields.${index}.description`}
        render={({ field }) => (
          <FormItem className="col-span-5">
            <FormLabel>Opis</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        className="col-span-2 self-center justify-self-end"
        variant="link"
        onClick={remove}
      >
        <Cross1Icon className="text-destructive/90 h-8 w-8" />
      </Button>
    </Card>
  );
};
