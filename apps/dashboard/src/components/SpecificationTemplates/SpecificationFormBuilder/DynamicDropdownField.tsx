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

export const DynamicDropdownField = ({ key, control, index, remove }) => {
  const {
    fields,
    append,
    remove: removeDescription,
  } = useFieldArray({
    control,
    name: `dynamicDropdownFields.${index}.options`,
  });

  return (
    <Card className="grid grid-cols-12 gap-4 bg-slate-600/20">
      <div className="col-span-5 space-y-3">
        <FormField
          key={key}
          control={control}
          name={`dynamicDropdownFields.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa </FormLabel>
              <FormControl>
                <Input placeholder="Rozmiar Ekranu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key={key}
          control={control}
          name={`dynamicDropdownFields.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis </FormLabel>
              <FormControl>
                <Input placeholder="Rozmiar ekranu np. 7 cali" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key={key}
          control={control}
          name={`dynamicDropdownFields.${index}.isMultipleChoice`}
          render={({ field }) => (
            <FormItem className="col-span-1 grid self-start">
              <FormLabel>Wielokrotnego wyboru:</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-5 space-y-3">
        {fields.map((field, descIndex) => (
          <FormField
            name={`dynamicDropdownFields.${index}.options.${descIndex}.option`}
            key={field.id}
            control={control}
            render={({ field }) => (
              <FormItem key={field.id}>
                <FormLabel>Opcja {descIndex + 1}</FormLabel>
                <FormControl>
                  <div className="flex w-full flex-row space-x-2">
                    <Input
                      {...control.register(
                        `dynamicDropdownFields.${index}.options.${descIndex}.option`,
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeDescription(descIndex)}
                    >
                      <Cross1Icon />
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button className="col-span-5" onClick={() => append({ option: "" })}>
          Dodaj Odpowiedź
        </Button>
      </div>
      <Button
        variant="link"
        onClick={() => remove(index)}
        className="col-span-2 self-center justify-self-end"
      >
        <Cross1Icon className="text-destructive/90 h-8 w-8" />
      </Button>
    </Card>
  );
};
