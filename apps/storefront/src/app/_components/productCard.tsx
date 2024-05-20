import Image from "next/image";
import Link from "next/link";

import { Product } from "@acme/db";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="relative  m-1 max-w-sm basis-1/4 overflow-hidden rounded border border-gray-200 p-4 shadow-lg"
    >
      <div className=" ">
        <div className="flex h-48 w-full items-center justify-center">
          <Image
            src={product.mainImageUrl || "test"}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="px-2 py-4">
          <div className="mb-2 line-clamp-2 text-sm">{product.name}</div>
          <p className="text-base text-gray-700">{product.price} zł</p>
        </div>
        <div className="absolute right-2 top-2">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none"></button>
        </div>
        <div className="absolute bottom-2 right-2">
          <button className="rounded-full bg-green-500 p-2 text-white hover:bg-green-700 focus:outline-none"></button>
        </div>
      </div>
    </Link>
  );
};
