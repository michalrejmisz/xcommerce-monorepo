import { clsx } from "clsx";

import { ProductCategory } from "@acme/db";

import {
  DeleteProductCategoryForm,
  EditProductCategoryForm,
} from "~/components/ProductCategories";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

type ProductCategoryItemProps = {
  category: ProductCategory;
  isSelected?: boolean;
  isDeletable?: boolean;
  onSelectCategory?: (category: ProductCategory) => void;
  onDeleteCategory?: (categoryId: number) => void;
  onUpdateCategory?: (category: ProductCategory) => void;
};

const ProductCategoryItem: React.FC<ProductCategoryItemProps> = ({
  category,
  isSelected,
  isDeletable,
  onSelectCategory,
  onDeleteCategory,
  onUpdateCategory,
}) => {
  console.log("isSelected", category.name, isSelected);
  return (
    <Card
      className={cn(
        clsx("bg-background/70 m-2 h-auto w-40 p-3", {
          "bg-secondary/70": isSelected,
        }),
      )}
      onClick={() => onSelectCategory(category)}
    >
      <CardDescription className="text-md">{category.name}</CardDescription>
      <CardFooter className="justify-end p-0">
        {isDeletable && (
          <DeleteProductCategoryForm
            categoryId={category.id}
            onDelete={onDeleteCategory}
          />
        )}
        <EditProductCategoryForm
          category={category}
          onSave={onUpdateCategory}
        />
      </CardFooter>
    </Card>
  );
};

export default ProductCategoryItem;
