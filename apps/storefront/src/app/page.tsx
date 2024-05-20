"use client";

import { Suspense } from "react";

import { api } from "~/utils/api";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";
import { ProductCard } from "./_components/productCard";

export default function HomePage() {
  const { data: productsData } = api.product.getAll.useQuery();
  return (
    <main className="">
      <div>Index page</div>
      <div className="flex w-[827px] flex-row flex-wrap">
        {productsData?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
