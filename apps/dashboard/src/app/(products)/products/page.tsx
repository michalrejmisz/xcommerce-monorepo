"use client";

import { randomUUID } from "crypto";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { Product, ProductCategory } from "@acme/db";

import { CreateProductCategoryForm } from "~/components/ProductCategories";
import { SpecificationFormBuilder } from "~/components/SpecificationTemplates/SpecificationFormBuilder/SpecificationFormBuilder";
import SpecificationTemplateForm from "~/components/SpecificationTemplates/SpecificationTemplateForm";
import { Card } from "~/components/ui/card";
import { useCategoryNavigation } from "~/hooks/useCategoryNavigation";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { CreateProductForm } from "./_components/createProductForm";

export default function ProductsPage() {
  const { mutate: createProduct } = api.product.create.useMutation();

  return (
    <div>
      <div>Produkty</div>
      <CreateProductForm onSubmitForm={createProduct} />
    </div>
  );
}
