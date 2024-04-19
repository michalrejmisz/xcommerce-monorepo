import React, { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { ProductCategory } from "@acme/db";

import ProductCategoryItem from "./ProductCategoryItem";

type CategoryListProps = {
  categories: ProductCategory[] | null;
  selectedCategory?: ProductCategory | null;
  isDeletable?: boolean;
  onSelectCategory?: (category: ProductCategory) => void;
  onDeleteCategory?: (categoryId: number) => void;
  onUpdateCategory?: (category: ProductCategory) => void;
};

const ProductCategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  isDeletable,
  onSelectCategory,
  onDeleteCategory,
  onUpdateCategory,
}) => {
  return (
    <ul>
      {categories?.map((category) => (
        <li key={category.id}>
          <ProductCategoryItem
            category={category}
            onSelectCategory={onSelectCategory}
            onDeleteCategory={onDeleteCategory}
            onUpdateCategory={onUpdateCategory}
            isSelected={selectedCategory?.id === category.id}
            isDeletable={isDeletable}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductCategoryList;
