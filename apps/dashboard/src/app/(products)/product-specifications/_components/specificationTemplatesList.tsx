import { Prisma } from "@prisma/client";

import {
  ProductSpecificationTemplate,
  SpecificationTemplateGroup,
} from "@acme/db";

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

type SpecificationTemplateGroupWithCategories =
  Prisma.SpecificationTemplateGroupGetPayload<{
    include: {
      category?: true;
    };
  }>;

export const SpecificationTemplatesList = ({
  templates,
}: {
  templates: SpecificationTemplateGroupWithCategories[];
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
            {templates?.map(
              (template: SpecificationTemplateGroupWithCategories) => {
                return (
                  <TableRow key={template.id}>
                    <TableCell>{template.name}</TableCell>
                    <TableCell>
                      {template.description || "Brak opisu"}
                    </TableCell>
                    <TableCell>
                      {template.category?.name || "Globalna"}
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
