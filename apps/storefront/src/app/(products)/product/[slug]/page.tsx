"use client";

import Image from "next/image";

import "@acme/db";

import { ProductImage } from "@acme/db";

import { api } from "~/utils/api";

type ProductTitleProps = {
  name: string;
  category: string;
};

const ProductTitle: React.FC<ProductTitleProps> = ({ name, category }) => (
  <div>
    <h1 className="text-customGray-600 text-lg md:text-xl xl:text-2xl">
      {name}
    </h1>
    <div>
      <span>od: </span>
      <span className="font-bold">{category}</span>
    </div>
  </div>
);

const Buybox: React.FC = () => (
  <div className="border-customGray-50 border-1 h-96 w-full rounded-lg border bg-white xl:w-72">
    Test
  </div>
);

const DescriptionBox: React.FC = () => {
  const descriptionMockup = [
    { specification: "Procesor", description: "Intel® Celeron N4500" },
    { specification: "Pamięć", description: "8GB" },
    { specification: "Grafika", description: "Intel UHD Graphics" },
    { specification: "Typ Ekranu", description: "Matowy, LED, IPS" },
  ];

  return (
    <div className="in-w-[120px] flex-1 basis-0 pr-8">
      <ul className="border-customGray-50 border-t pb-1 pt-3">
        {descriptionMockup.map((spec) => (
          <li key={spec.specification} className="pb-2">
            <span className="text-customGray-100 mr-2 cursor-pointer text-xs underline">
              {spec.specification}:
            </span>
            <span className="text-xs">{spec.description}</span>
          </li>
        ))}
      </ul>
      <button className="text-customGray-500 hover:bg-customGray-50 rounded-lg px-2 py-[6px] text-xs">
        Przewiń do pełnej specyfikacji
      </button>
    </div>
  );
};

type ProductGalleryProps = {
  mainImageUrl: string;
  imagesUrlArray: ProductImage[];
};

const ProductGallery: React.FC<ProductGalleryProps> = ({
  mainImageUrl,
  imagesUrlArray,
}) => (
  <div className="h-full w-full basis-1/2 sm:px-2 md:basis-7/12 md:px-3 lg:basis-4/6 lg:px-4 xl:basis-[47%]">
    <Image
      src={mainImageUrl}
      width={500}
      height={500}
      alt="Main Product Image"
      className="mb-2"
    />
    <div className="flex flex-row">
      {imagesUrlArray?.map((image) => (
        <div
          key={image.id}
          className="hover:border-customGray-500 border-customGray-50 mr-1 rounded-lg border"
        >
          <Image
            src={image.url}
            width={70}
            height={60}
            alt="Product Thumbnail"
            className="m-2"
          />
        </div>
      ))}
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

  if (!productData) return <div>Loading...</div>;

  return (
    <div>
      <div>Produkt</div>
      <div className="sm:col flex h-screen flex-row flex-wrap">
        <ProductGallery
          mainImageUrl={productData.mainImageUrl}
          imagesUrlArray={productData.images}
        />
        <div className="h-full w-full basis-1/2 sm:px-2 md:basis-5/12 md:px-3 lg:basis-1/3 lg:px-4 xl:basis-[53%]">
          <ProductTitle
            name={productData.name}
            category={productData.category.name}
          />
          <div className="flex-end flex h-full w-full flex-row flex-wrap xl:flex-nowrap">
            <DescriptionBox />
            <Buybox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
