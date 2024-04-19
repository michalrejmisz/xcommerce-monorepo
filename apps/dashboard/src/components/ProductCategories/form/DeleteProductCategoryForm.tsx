import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type Props = {
  categoryId: number;
  onDelete: (categoryId: number) => void;
};

const DeleteProductCategoryForm: React.FC<Props> = ({
  categoryId,
  onDelete,
}) => {
  const handleConfirm = () => {
    onDelete(categoryId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Usuń
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Usuń kategorię</DialogTitle>
        <DialogDescription>
          Czy na pewno chcesz usunąć kategorię?
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary" className="mr-2">
              Nie
            </Button>
            <Button variant="destructive" onClick={handleConfirm} type="submit">
              Usuń
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductCategoryForm;
