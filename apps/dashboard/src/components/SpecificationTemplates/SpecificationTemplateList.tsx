// components/SpecificationTemplateList.js
"use client";

import { api } from "~/utils/api";

const SpecificationTemplateList = () => {
  const { data: templates, isLoading } = api.specTemplate.getAll.useQuery();
  if (isLoading) return <p>Loading...</p>;
  if (!templates) return <p>No templates found.</p>;

  return (
    <ul>
      {templates.map((template: any) => (
        <li key={template.id}>
          {template.key} - Category ID: {template.categoryId}
        </li>
      ))}
    </ul>
  );
};

export default SpecificationTemplateList;
