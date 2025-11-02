import { getProducts } from "@/lib/api";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

export async function ProductList() {
  let products: Product[] = [];
  try {
    products = await getProducts({ limit: "8" });
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  if (!products.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
        <p className="text-slate-500">No products available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
