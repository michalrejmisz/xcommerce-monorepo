"use client";

import { randomUUID } from "crypto";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { Product, ProductCategory } from "@acme/db";

import { SpecificationFormBuilder } from "~/components/SpecificationTemplates/SpecificationFormBuilder/SpecificationFormBuilder";
import SpecificationTemplateForm from "~/components/SpecificationTemplates/SpecificationTemplateForm";
import { Card } from "~/components/ui/card";
import { useCategoryNavigation } from "~/hooks/useCategoryNavigation";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { SpecificationTemplatesList } from "./_components/specificationTemplatesList";

export default function ProductSpecificaitonsPage() {
  const { data: productCategoriesData } = api.productCategory.getAll.useQuery();

  const { data: specificationTemplatesData } =
    api.specifications.getAll.useQuery();
  const { mutate: createSpecificationTemplate } =
    api.specifications.create.useMutation();
  const { path, categoryColumns, isDeletable, handleSelectCategory } =
    useCategoryNavigation(productCategoriesData);

  const isCategorySelected = (category: ProductCategory) => {
    return path.some((p) => p.id === category.id);
  };

  console.log(createSpecificationTemplate);

  return (
    <>
      <h1>Product Specification</h1>
      {/* Categories list */}
      <div className="flex flex-col">
        {categoryColumns?.map(
          (categories: ProductCategory[], index: number) => {
            const isLastColumn = index === categoryColumns.length - 1;
            const currentColumnIsDeletable = isDeletable && isLastColumn;
            return (
              <div className="flex flex-row" key={index}>
                {categories.map((category: ProductCategory, key: number) => {
                  const selected = isCategorySelected(category);
                  return (
                    <Card
                      className={cn(
                        "mb-3 mr-3 inline-flex justify-between p-3",
                        {
                          "bg-primary/70 text-secondary": selected,
                          "text-secondary bg-red-200/70":
                            selected && category.isLeaf,
                        },
                      )}
                      onClick={() => handleSelectCategory(category, index)}
                    >
                      {category.name}
                      {!category.isLeaf && (
                        <TriangleRightIcon className="h-6 w-6 self-end justify-self-end" />
                      )}
                    </Card>
                  );
                })}
              </div>
            );
          },
        )}
        {/* End of categories */}
        {/* Selected templates */}
        <div>
          <h2>Selected templates</h2>
        </div>
        <SpecificationTemplatesList templates={specificationTemplatesData} />
        {/* End templates */}
        {/* Form of template */}
        <div>
          <SpecificationFormBuilder
            onSubmitForm={createSpecificationTemplate}
          />
        </div>
        {/* End of template */}
      </div>
    </>
  );
}
