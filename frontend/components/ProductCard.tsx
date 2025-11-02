"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import type { Product } from "@/types";
import { addToCart } from "@/app/actions/cart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={product.images?.[0] ?? "/images/placeholders/product-placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={`/product/${product.slug}`} className="text-sm uppercase text-blue-600">
            {product.category}
          </Link>
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
            <Link href={`/product/${product.slug}`}>{product.title}</Link>
          </h3>
        </div>
        <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-900">{price}</div>
            {product.original_price ? (
              <div className="text-sm text-slate-400 line-through">
                ${product.original_price.toFixed(2)}
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({product.num_reviews})</span>
          </div>
        </div>
        <form
          action={async () => {
            "use server";
            await addToCart(product.id, 1);
          }}
        >
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </article>
  );
}
