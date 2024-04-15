import React, { useEffect } from "react";
import { FormButton, FormContainer, FormInput } from "@/admin/components/form";
import { Modal } from "@/common/components/UI/Modal";
import { useModal } from "@/common/hooks/useModal";
import { ProductCategory } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type EditCategoryProps = {
  category: ProductCategory;
  onSave: (category: ProductCategory) => void;
};

const schema = z.object({
  id: z.number(),
  name: z.string().min(1, "Nazwa jest wymagana"),
  parentId: z.number().nullable(),
  path: z.string(),
  level: z.number(),
});

export const EditCategoryForm: React.FC<EditCategoryProps> = ({
  category,
  onSave,
}) => {
  const { isVisible, openModal, closeModal } = useModal();
  const methods = useForm<ProductCategory>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: category.id,
      name: category.name,
      parentId: category.parentId,
      path: category.path,
      level: category.level,
    },
  });

  const handleClose = () => {
    closeModal();
    methods.reset();
  };

  const onSubmit: SubmitHandler<ProductCategory> = (data) => {
    console.log(data);
    onSave(data);
    handleClose();
  };

  return (
    <>
      <button onClick={openModal} className="font-bold text-white">
        Edytuj
      </button>
      <Modal isVisible={isVisible} onClose={handleClose}>
        <FormProvider {...methods}>
          <FormContainer
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 p-3"
          >
            <FormInput name="name" label="Nazwa" />
            <FormButton type="submit" className="self-end">
              Zapisz
            </FormButton>
          </FormContainer>
        </FormProvider>
      </Modal>
    </>
  );
};
