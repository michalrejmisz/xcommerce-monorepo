import { useEffect } from "react";
import { HomeIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

import { ProductCategory } from "@acme/db";

import { Card } from "~/components/ui/card";
import { useCategoryNavigation } from "~/hooks/useCategoryNavigation";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

interface CategoryListProps {
  onCategoryChange: (categoryId: number) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  onCategoryChange,
}) => {
  const { data: productCategoriesData } = api.productCategory.getAll.useQuery();
  const {
    path,
    categoryColumns,
    isDeletable,
    getLastColumn,
    handleSelectCategory,
    resetPath,
  } = useCategoryNavigation(productCategoriesData);

  let categories = [];
  const isCategorySelected = (category: ProductCategory) => {
    return path.some((p) => p.id === category.id);
  };

  useEffect(() => {
    if (path.length > 0 && path[path.length - 1].isLeaf) {
      onCategoryChange(path[path.length - 1].id);
    } else {
      onCategoryChange(null);
    }
  }, [path, onCategoryChange]);

  if (path) {
    if (isDeletable) {
      categories = [];
    } else {
      categories = getLastColumn();
    }
  } else {
    categories = categoryColumns[0];
  }

  return (
    <div>
      <Card className="flex flex-col bg-slate-600/20">
        <Card className={cn("mb-3 mr-3 inline-flex gap-2 p-2 text-sm", {})}>
          <div className="flex flex-row flex-wrap gap-1">
            <span className="">Wybrane kategorie:</span>
            <span
              className="cursor-pointer p-1 hover:underline"
              onClick={resetPath}
            >
              <HomeIcon className="h-4 w-4" />
            </span>
            {path.map((category, index) => {
              return (
                <>
                  <span
                    className={cn(
                      "margin-span inline-flex cursor-pointer hover:underline",
                      {
                        "text-green-500": category.isLeaf,
                      },
                    )}
                    onClick={() => handleSelectCategory(category, index)}
                  >
                    {category.name}{" "}
                  </span>
                  {!category.isLeaf && (
                    <TriangleRightIcon className="h-6 w-6 " />
                  )}
                </>
              );
            })}
          </div>
        </Card>

        <AnimatePresence>
          <div className="ml-5 flex flex-row">
            {categories.length > 0 && (
              <motion.div
                key="categories"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0, transition: { duration: 0.5 } }}
              >
                {categories.map((category: ProductCategory, key: number) => {
                  const selected = isCategorySelected(category);
                  return (
                    <Card
                      key={category.id}
                      className={cn(
                        "mb-3 mr-3 inline-flex justify-between p-2 text-sm",
                        {
                          "": selected && category.isLeaf,
                        },
                      )}
                      onClick={() =>
                        handleSelectCategory(category, path.length)
                      }
                    >
                      {category.name}
                      {!category.isLeaf && (
                        <TriangleRightIcon className="h-6 w-6 self-end justify-self-end" />
                      )}
                    </Card>
                  );
                })}
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </Card>
    </div>
  );
};
