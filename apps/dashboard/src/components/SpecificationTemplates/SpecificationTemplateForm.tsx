"use client";

import { useState } from "react";

import { api } from "~/utils/api";

const SpecificationTemplateForm = () => {
  const [key, setKey] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { mutate: addTemplate } = api.productCategory.create.useMutation({});

  const handleSubmit = (event) => {
    event.preventDefault();
    addTemplate({ key, categoryId: parseInt(categoryId, 10) });
    setKey("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Key"
        required
      />
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Category ID"
        required
      />
      <button type="submit">Add Template</button>
    </form>
  );
};

export default SpecificationTemplateForm;
