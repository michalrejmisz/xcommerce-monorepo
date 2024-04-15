import React, { useState } from "react";
// import { ConfirmationModal } from "@/admin/components/UI/ConfirmationModal/ConfirmationModal";
import { AdminModal, Button, ConfirmationModal } from "@/admin/components/UI";

type Props = {
  categoryId: number;
  onDelete: (categoryId: number) => void;
};

const DeleteCategoryButton: React.FC<Props> = ({ categoryId, onDelete }) => {
  const handleConfirm = () => {
    onDelete(categoryId);
  };

  return (
    <>
      <ConfirmationModal
        confirmText="Czy chcesz usunąć kategorię?"
        cancelButtonText="Nie"
        confirmButtonText="Tak"
        onConfirm={handleConfirm}
      >
        <Button variant="ghost" colorScheme="danger">
          Usuń
        </Button>
      </ConfirmationModal>
    </>
  );
};

export default DeleteCategoryButton;
