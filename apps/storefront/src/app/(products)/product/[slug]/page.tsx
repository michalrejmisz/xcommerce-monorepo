"use client";

import Image from "next/image";

import "@acme/db";

import { CheckCircledIcon } from "@radix-ui/react-icons";

import { ProductImage } from "@acme/db";

import { Button } from "~/components/ui/button";
import { CircleApprove } from "~/components/ui/icons";
import useTailwindBreakpoint from "~/hooks/useTailwindBreakpoints";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import BuyBox from "./_components/BuyBox";
import DescriptionBox from "./_components/DescriptionBox";
import DropdownQuantity from "./_components/DropdownQuantity";
import ProductGallery from "./_components/ProductGallery/";

type ProductTitleProps = {
  name: string;
  category: string;
};

const ProductTitle: React.FC<ProductTitleProps> = ({ name, category }) => (
  <div className="w-full break-words pb-3 max-lg:basis-full">
    <h1 className="text-lg text-gray-500 md:text-xl xl:text-2xl">{name}</h1>
    <div className="text-xs">
      <div className="text-gray-250 mr-1 block">
        <span>od: </span>
        <span className="font-bold text-gray-300">{category}</span>
        <span className="mx-2">|</span>
        <span>kod x-kom: 1249506</span>
      </div>
    </div>
  </div>
);

type ProductsPageProps = {
  params: { slug: string };
};

const ProductsPage: React.FC<ProductsPageProps> = ({ params }) => {
  const { data: productData } = api.product.getBySlug.useQuery({
    slug: params.slug,
  });
  const { isScreenXL } = useTailwindBreakpoint();

  if (!productData) return <div>Loading...</div>;

  return (
    <div>
      <div>Produkt</div>
      <div className="flex h-screen flex-wrap md:flex-row">
        {!isScreenXL && (
          <ProductTitle
            name={productData.name}
            category={productData.category.name}
          />
        )}

        <ProductGallery
          mainImageUrl={productData.mainImageUrl}
          imagesUrlArray={productData.images}
        />
        <div className="flex h-full w-full basis-full flex-col sm:max-md:px-2 md:basis-5/12 md:px-3 lg:basis-1/3 lg:px-4 xl:basis-[53%]">
          {isScreenXL && (
            <ProductTitle
              name={productData.name}
              category={productData.category.name}
            />
          )}

          <div className="flex-end flex h-full w-full flex-col flex-wrap sm:max-md:px-2 md:max-xl:px-3  xl:flex-row-reverse xl:flex-nowrap">
            <BuyBox />
            <DescriptionBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
