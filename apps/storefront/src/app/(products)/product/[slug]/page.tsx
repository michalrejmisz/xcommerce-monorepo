"use client";

import Image from "next/image";

import "@acme/db";

import { CheckCircledIcon } from "@radix-ui/react-icons";

import { ProductImage } from "@acme/db";

import { Button } from "~/components/ui/button";
import { CircleApprove } from "~/components/ui/icons";
import { ActiveSectionProvider } from "~/contexts/ActiveSectionContext";
import useTailwindBreakpoint from "~/hooks/useTailwindBreakpoints";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import BuyBox from "./_components/BuyBox";
import DescriptionBox from "./_components/DescriptionBox";
import DropdownQuantity from "./_components/DropdownQuantity";
import ProductGallery from "./_components/ProductGallery/";
import ProductNavbar from "./_components/ProductNavbar";
import ProductSection from "./_components/ProductSection";
import DescriptionSection from "./_components/Sections/DescriptionSection";
import RecommendationsSection from "./_components/Sections/RecommendationsSection";
import SpecificationSection from "./_components/Sections/SpecificationSection";

type ProductTitleProps = {
  name: string;
  category: string;
};

const ProductTitle: React.FC<ProductTitleProps> = ({ name, category }) => (
  <div className="box-border flex w-full flex-col flex-wrap break-words pb-3 max-lg:basis-full max-md:order-2 max-md:px-2 md:max-xl:px-3 lg:px-4 xl:order-2 xl:col-span-1 xl:row-span-1">
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
      <div className="flex flex-wrap max-md:px-2 md:flex-row lg:grid-cols-[66%_33%] xl:grid xl:grid-cols-[47%_53%] xl:grid-rows-[auto_auto] xl:flex-wrap">
        <ProductTitle
          name={productData.name}
          category={productData.category.name}
        />

        <ProductGallery
          mainImageUrl={productData.mainImageUrl}
          imagesUrlArray={productData.images}
        />
        <div className="box-border flex w-full basis-full flex-col  max-md:order-2 max-md:px-2 md:basis-5/12 md:px-3 lg:basis-1/3 lg:px-4 xl:order-3  xl:col-span-1 xl:row-span-1">
          <div className="flex-end flex h-full w-full flex-col flex-wrap sm:max-md:px-2 md:max-xl:px-3 xl:flex-row-reverse xl:flex-nowrap">
            <BuyBox />
            <DescriptionBox />
          </div>
        </div>
      </div>

      <ActiveSectionProvider>
        <div>
          {/* ... (existing content) */}
          <ProductNavbar />
          <ProductSection name="description">
            <DescriptionSection />
          </ProductSection>
          <ProductSection name="specification">
            <SpecificationSection />
          </ProductSection>
          <ProductSection name="recommendations">
            <RecommendationsSection />
          </ProductSection>
          {/* <PromoSection />
          <DescriptionSection />
          <SpecificationSection />
          <AccessoriesSection />
          <ReviewsSection />
          <QASection /> */}
        </div>
      </ActiveSectionProvider>
    </div>
  );
};

export default ProductsPage;
