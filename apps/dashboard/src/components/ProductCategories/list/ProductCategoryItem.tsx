import { ProductCategory } from "@acme/db";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type ProductCategoryItemProps = {
  category: ProductCategory;
  isSelected?: boolean;
  isDeletable?: boolean;
  onSelectCategory?: (category: ProductCategory) => void;
  onDeleteCategory?: (categoryId: number) => void;
  onUpdateCategory?: (category: ProductCategory) => void;
};

export const ProductCategoryItem: React.FC<ProductCategoryItemProps> = ({
  category,
  isSelected,
  isDeletable,
  onSelectCategory,
  onDeleteCategory,
  onUpdateCategory,
}) => {
  return (
    <Card className="w-36 p-3">
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent>{/* <Text>{category.path}</Text> */}</CardContent>
      <CardFooter>
        {/* <ButtonGroup>
          <Button>Edit</Button>
          <DeleteCategoryButton categoryId={category.id} onDelete={onDelete} />
        </ButtonGroup> */}
      </CardFooter>
    </Card>
  );
};
