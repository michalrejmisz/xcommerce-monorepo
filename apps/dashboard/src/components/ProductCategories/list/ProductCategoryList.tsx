import React, { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { ProductCategory } from "../../../types/global";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { EditCategoryForm } from "./form/EditCategoryForm";

type CategoryListProps = {
  categories: ProductCategory[] | null;
  selectedCategory: ProductCategory | null;
  isDeletable: boolean;
  onSelectCategory: (category: ProductCategory) => void;
  onDeleteCategory: (categoryId: number) => void;
  onUpdateCategory: (category: ProductCategory) => void;
  // onSelectCategory: (category: ProductCategory) => void;
};

type CategoryItemProps = {
  category: ProductCategory;
  isSelected: boolean;
  isDeletable: boolean;
  onSelectCategory: (category: ProductCategory) => void;
  onDeleteCategory: (categoryId: number) => void;
  onUpdateCategory: (category: ProductCategory) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isSelected,
  isDeletable,
  onSelectCategory,
  onDeleteCategory,
  onUpdateCategory,
}) => {
  const itemClass = clsx(
    "relative m-3 w-36 border-spacing-5 bg-gray-200 p-3 shadow-md border-2",
    { "rotating-border bg-blue-100": isSelected },
  );

  return (
    <>
      <div className={itemClass} onClick={() => onSelectCategory(category)}>
        <button className="text-left">{category.name}</button>
        <AnimatePresence>
          {isSelected && (
            <div>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-row justify-end overflow-hidden"
              >
                <EditCategoryForm
                  onSave={onUpdateCategory}
                  category={category}
                />
                {isDeletable && (
                  <DeleteCategoryButton
                    categoryId={category.id}
                    onDelete={onDeleteCategory}
                  />
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const CategoryList: React.FC<CategoryListProps> = ({
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
          <CategoryItem
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

export default CategoryList;
