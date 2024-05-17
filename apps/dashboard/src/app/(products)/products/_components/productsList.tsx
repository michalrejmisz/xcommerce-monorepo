import { Prisma } from "@prisma/client";

import { Product } from "@acme/db";

import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/utils/api";

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category?: true;
  };
}>;

export const ProductsList = ({
  products,
}: {
  products: ProductWithCategory[];
}) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa</TableHead>
              <TableHead>Opis</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Operacja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: Product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description || "Brak opisu"}</TableCell>
                  <TableCell>{product.categoryId}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
