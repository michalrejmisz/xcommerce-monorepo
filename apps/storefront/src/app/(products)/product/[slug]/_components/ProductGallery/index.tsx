"use client";

import useTailwindBreakpoint from "~/hooks/useTailwindBreakpoints";
import DesktopGallery from "./DesktopGallery";
import MobileGallery from "./MobileGallery";
import { ProductGalleryProps } from "./ProductGallery.types";

const ProductGallery: React.FC<ProductGalleryProps> = ({
  mainImageUrl,
  imagesUrlArray,
}) => {
  const { isScreenSM } = useTailwindBreakpoint();

  return (
    <div className="box-border w-full basis-1/2 max-md:order-1 sm:px-2 md:basis-7/12 md:px-3 lg:basis-4/6 lg:px-4 xl:order-1 xl:col-span-1 xl:row-span-2">
      {/* <div className="box-border w-full basis-1/2 sm:px-2 md:basis-7/12 md:px-3 lg:basis-4/6 lg:px-4 xl:order-1 xl:basis-[47%]"> */}
      <div className="relative w-full md:h-[343px] lg:h-[530px] xl:h-[433px]">
        {isScreenSM ? (
          <MobileGallery
            mainImageUrl={mainImageUrl}
            imagesUrlArray={imagesUrlArray}
          />
        ) : (
          <DesktopGallery
            mainImageUrl={mainImageUrl}
            imagesUrlArray={imagesUrlArray}
          />
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
