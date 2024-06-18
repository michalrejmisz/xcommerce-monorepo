"use client";

import Image from "next/image";

import "@acme/db";

import { useState } from "react";

import { ProductImage } from "@acme/db";

import useTailwindBreakpoint from "~/hooks/useTailwindBreakpoints";
import { cn } from "~/lib/utils";
import { ProductGalleryProps } from "./ProductGallery.types";

type ThumbnailsProps = {
  images: ProductImage[];
  setImageUrl: (url: string) => void;
};
const Thumbnails = ({ images, setImageUrl }: ThumbnailsProps) => {
  const [borderIndex, setBorderIndex] = useState<number | null>(null);
  const { isScreenSM, isScreenMD, isScreenLG, isScreenXL } =
    useTailwindBreakpoint();

  let numberThumbnails = 7;
  if (isScreenXL) numberThumbnails = 7;
  if (isScreenLG) numberThumbnails = 5;
  if (isScreenMD) numberThumbnails = 2;
  if (isScreenSM) numberThumbnails = 0;

  let overflowWrapper = false;
  let overFlowCounter = 0;
  let overFlowMiniThumbnails = 0;
  if (images.length > numberThumbnails) {
    overflowWrapper = true;
    numberThumbnails -= 1;
    overFlowCounter = images.length - numberThumbnails;
    overFlowMiniThumbnails = overFlowCounter > 4 ? 4 : overFlowCounter;
  }

  const handleMouseEnter = (imageUrl: string, index: number) => {
    setImageUrl(imageUrl);
    setBorderIndex(index);
  };

  return (
    <div className="relative flex w-full flex-row justify-center">
      {images?.slice(0, numberThumbnails).map((image, index) => {
        return (
          <div
            key={image.id}
            className={cn(
              "transition-border-color ease-custom-cubic relative mr-1 box-border h-[179px] w-[calc(50%-8px)] rounded-lg border border-gray-200 duration-300 hover:border-gray-400 lg:h-[109px] lg:w-[calc(20%-4px)] xl:h-[60px] xl:w-[calc(14.2857%-4px)]",
              { "border-gray-400": borderIndex == index },
            )}
            onMouseEnter={() => handleMouseEnter(image.url, index)}
          >
            <Image
              src={image.url}
              fill
              objectFit="contain"
              alt="Product Thumbnail"
              className="p-2"
            />
          </div>
        );
      })}

      {overflowWrapper && (
        <div className="transition-border-color ease-custom-cubic relative mr-1 box-border flex h-[179px] w-[calc(50%-8px)] flex-row flex-wrap items-center justify-center rounded-lg border border-gray-200 duration-300 hover:border-gray-400 hover:border-gray-400 lg:h-[109px] lg:w-[calc(20%-4px)] xl:h-[60px] xl:w-[calc(14.2857%-4px)]">
          {images
            ?.slice(numberThumbnails, numberThumbnails + overFlowMiniThumbnails)
            .map((image, index) => {
              return (
                <span className="border-box relative h-[45%] w-[45%] opacity-[0.16]">
                  <Image
                    src={image.url}
                    fill
                    objectFit="contain"
                    alt=""
                    className="m-1 box-border md:p-4 lg:p-3 xl:p-2"
                  />
                </span>
              );
            })}
          <span className="absolute inset-1/4">+{overFlowCounter}</span>
        </div>
      )}
    </div>
  );
};

const DesktopGallery: React.FC<ProductGalleryProps> = ({
  mainImageUrl,
  imagesUrlArray,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(mainImageUrl);
  return (
    <>
      <div className="h-full">
        <Image
          src={imageUrl}
          layout="fill"
          objectFit="contain"
          alt="Main Product Image"
          className="relative mb-2 "
        />
      </div>

      <Thumbnails images={imagesUrlArray} setImageUrl={setImageUrl} />
    </>
  );
};

export default DesktopGallery;
