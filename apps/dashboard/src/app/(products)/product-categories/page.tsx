"use client";

import { on } from "events";
import { map } from "@trpc/server/observable";
import { AnimatePresence, motion } from "framer-motion";

import { Product, ProductCategory } from "@acme/db";

import {
  CreateProductCategoryForm,
  ProductCategoryItem,
  ProductCategoryList,
} from "~/components/ProductCategories";
import { useCategoryNavigation } from "~/hooks/useCategoryNavigation";
import { api } from "~/utils/api";

export default function ProductCategoriesPage() {
  const getProductCategories = api.productCategory.getAll.useQuery();
  const { mutate: createCategory } = api.productCategory.add.useMutation({
    onSettled: () => {
      getProductCategories.refetch();
    },
  });
  const { mutate: deleteCategory } = api.productCategory.delete.useMutation({
    onSettled: () => {
      getProductCategories.refetch();
    },
  });

  const { mutate: updateCategory } = api.productCategory.update.useMutation({
    onSettled: () => {
      getProductCategories.refetch();
    },
  });

  const { path, categoryColumns, isDeletable, handleSelectCategory } =
    useCategoryNavigation(getProductCategories?.data);

  const handleCreateCategory = (category: Omit<ProductCategory, "id">) => {
    createCategory(category);
  };

  const handleDeleteCategory = (categoryId: number) => {
    deleteCategory(categoryId);
  };

  const handleUpdateCategory = (category: ProductCategory) => {
    updateCategory(category);
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Category Hierarchy</h1>

      <div className="flex flex-row space-x-4">
        <AnimatePresence initial={false}>
          {categoryColumns?.map(
            (categories: ProductCategory[], index: number) => {
              const uniqueKey = `column-${index}-${categories[0]?.id || "root"}`;
              // Determine if this is the last column
              const isLastColumn = index === categoryColumns.length - 1;
              const currentColumnIsDeletable = isDeletable && isLastColumn;
              // parentIdLoop = path[index];
              return (
                <motion.div
                  key={uniqueKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                  className="flex overflow-hidden"
                >
                  <div className="flex flex-col">
                    <ProductCategoryList
                      key={uniqueKey || "none"}
                      categories={categories}
                      onDeleteCategory={handleDeleteCategory}
                      onUpdateCategory={handleUpdateCategory}
                      onSelectCategory={(category: ProductCategory) =>
                        handleSelectCategory(category, index)
                      }
                      selectedCategory={path[index]}
                      isDeletable={currentColumnIsDeletable}
                    />
                    <div>Parent id: {path[index - 1]?.id}</div>
                    <CreateProductCategoryForm
                      onSave={handleCreateCategory}
                      parent={path[index - 1]?.id ?? null}
                    />
                  </div>
                </motion.div>
              );
            },
          )}
          {isDeletable && (
            <motion.div
              key="create-category-column"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="flex overflow-hidden"
            >
              <div className="flex flex-col">
                <CreateProductCategoryForm
                  onSave={handleCreateCategory}
                  parent={path[path.length - 1]?.id ?? null}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
