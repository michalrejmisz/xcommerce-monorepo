"use client";

import React from "react";

import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";

interface ProductSectionProps {
  name: string;
  children: React.ReactNode;
}

const ProductSection: React.FC<ProductSectionProps> = ({ name, children }) => {
  const ref = useIntersectionObserver(name);

  return (
    <section ref={ref} id={name.toLowerCase().replace(/ /g, "-")}>
      {children}
    </section>
  );
};

export default ProductSection;
