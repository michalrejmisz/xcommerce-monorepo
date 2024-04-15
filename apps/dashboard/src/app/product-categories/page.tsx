"use client";

// import React, { useEffect, useState } from "react";

// import { CreateCategoryForm } from "@/admin/components/categories/form/CreateCategoryForm";
// import {
//   useCreateCategory,
//   useDeleteCategory,
//   useGetAllCategories,
//   useUpdateCategory,
// } from "@/common/hooks/useCategoryHooks";
// import { useCategoryNavigation } from "@/common/hooks/useCategoryNavigation";
// import { useToast } from "@/common/providers/ToastProvider";
// import { AnimatePresence, motion } from "framer-motion";
// import { useQueryClient } from "react-query";

// import CategoryList from "../../admin/components/categories/CategoryList";
// import DeleteCategoryButton from "../../admin/components/categories/DeleteCategoryButton";
// import { CategoryService } from "../../common/services/backend/categoryService";
// import { ProductCategory } from "../../types/global";
import { map } from "@trpc/server/observable";

import { ProductCategory } from "@acme/db";

import { CreateProductCategoryForm } from "~/components/ProductCategories/form/CreateProductCategoryForm";
import { ProductCategoryItem } from "~/components/ProductCategories/list/ProductCategoryItem";
import { api } from "~/utils/api";

const categoriesMockup = [
  {
    id: 1,
    name: "Electronics",
    parentId: null,
    path: "/electronics",
    level: 1,
    children: [
      {
        id: 4,
        name: "Computers",
        parentId: 1,
        path: "/electronics/computers",
        level: 2,
        children: [
          {
            id: 6,
            name: "Laptops",
            parentId: 4,
            path: "/electronics/computers/laptops",
            level: 3,
            children: [],
          },
          {
            id: 7,
            name: "Desktops",
            parentId: 4,
            path: "/electronics/computers/desktops",
            level: 3,
            children: [],
          },
        ],
      },
      {
        id: 5,
        name: "Smartphones",
        parentId: 1,
        path: "/electronics/smartphones",
        level: 2,
        children: [
          {
            id: 8,
            name: "Android Phones",
            parentId: 5,
            path: "/electronics/smartphones/android",
            level: 3,
            children: [],
          },
          {
            id: 9,
            name: "iPhones",
            parentId: 5,
            path: "/electronics/smartphones/iphones",
            level: 3,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Fashion",
    parentId: null,
    path: "/fashion",
    level: 1,
    children: [
      {
        id: 10,
        name: "Men's Clothing",
        parentId: 2,
        path: "/fashion/mens-clothing",
        level: 2,
        children: [],
      },
      {
        id: 11,
        name: "Women's Clothing",
        parentId: 2,
        path: "/fashion/womens-clothing",
        level: 2,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "Home and Garden",
    parentId: null,
    path: "/home-and-garden",
    level: 1,
    children: [
      {
        id: 12,
        name: "Kitchenware",
        parentId: 3,
        path: "/home-and-garden/kitchenware",
        level: 2,
        children: [],
      },
      {
        id: 13,
        name: "Furniture",
        parentId: 3,
        path: "/home-and-garden/furniture",
        level: 2,
        children: [],
      },
    ],
  },
];

// type CategoriesPageProps = {
//   initialCategories?: ProductCategory[];
//   initialError?: string;
// };

export default function ProductCategoriesPage() {
  const { mutate: createCategory } = api.productCategory.add.useMutation();
  const { data: getCategories } = api.productCategory.getAll.useQuery();

  const handleCreateCategory = (category: Omit<ProductCategory, "id">) => {
    createCategory(category);
  };

  console.log(getCategories);
  // () =>
  // ({ initialCategories, initialError }) => {
  // const queryClient = useQueryClient();
  // const {
  //   data: allCategories,
  //   error: queryError,
  //   isLoading,
  // } = useGetAllCategories(initialCategories);
  // const { mutate: deleteCategory } = useDeleteCategory();
  // const { mutate: createCategory } = useCreateCategory();
  // const { mutate: updateCategory } = useUpdateCategory();
  // const { path, categoryColumns, isDeletable, handleSelectCategory } =
  //   useCategoryNavigation(allCategories);
  // const [error, setError] = useState<string | undefined>(initialError);
  // // let parentIdLoop = null;

  // useEffect(() => {
  //   if (queryError) {
  //     setError(
  //       typeof queryError === "string"
  //         ? queryError
  //         : queryError.message || "An error occurred",
  //     );
  //   }
  // }, [queryError]);

  // const handleCreateCategory = (category: Omit<ProductCategory, "id">) => {
  //   createCategory(category);
  // };

  // const handleUpdateCategory = (category: ProductCategory) => {
  //   updateCategory({ id: category.id, data: category });
  // };

  // const handleDelete = (categoryId: number) => {
  //   deleteCategory(categoryId);
  // };

  // const RenderCategoryColumns = ({
  //     categories,
  //     handleSelect,
  //     isDeletable,
  //     path,
  // }) => {
  //     return categories.map((categories, index) => {
  //         const uniqueKey = `column-${index}-${categories[0]?.id || "root"}`;
  //         const isLastColumn = index === categories.length - 1;

  //         return (
  //             <motion.div
  //                 key={uniqueKey}
  //                 className="flex overflow-hidden" /* Other props */
  //             >
  //                 <CategoryList
  //                     categories={categories}
  //                     onSelectCategory={(category) =>
  //                         handleSelect(category, index)
  //                     }
  //                     /* Other props */
  //                 />
  //             </motion.div>
  //         );
  //     });
  // };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Category Hierarchy</h1>
      <CreateProductCategoryForm onSave={handleCreateCategory} parent={null} />
      {/* {getCategories?.map((category) => (
        <ProductCategoryItem key={category.id} category={category} />
      ))} */}
      {/* <div className="flex flex-row space-x-4">
        <AnimatePresence initial={false}>
          {categoriesMockup.map((categories, index) => {
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
                  <CategoryList
                    key={uniqueKey || "none"}
                    categories={categories}
                    onDeleteCategory={handleDelete}
                    onUpdateCategory={handleUpdateCategory}
                    onSelectCategory={(category) =>
                      handleSelectCategory(category, index)
                    }
                    selectedCategory={path[index]}
                    isDeletable={currentColumnIsDeletable}
                  />
                  <CreateCategoryForm
                    onSave={handleCreateCategory}
                    parent={path[index - 1]?.id ?? null}
                  />
                </div>
              </motion.div>
            );
          })}
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
                <CreateCategoryForm
                  onSave={handleCreateCategory}
                  parent={path[path.length - 1]?.id ?? null}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>{" "} */}
    </>
  );
}
