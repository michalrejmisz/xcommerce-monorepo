import { ProductImage } from "@acme/db";

export type ProductGalleryProps = {
    mainImageUrl: string;
    imagesUrlArray: ProductImage[];
  };