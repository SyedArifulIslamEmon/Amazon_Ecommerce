import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const query = await searchParams;

  let products: Product[] = [];
  try {
    products = await getProducts({ ...query, category: slug });
  } catch (error) {
    console.error("Failed to load category products", error);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Category</p>
        <h1 className="text-3xl font-bold tracking-tight">{slug.replace(/-/g, " ")}</h1>
        <p className="text-sm text-slate-500">Discover products curated for you with smart filters and AI personalization.</p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
        <FilterSidebar />
        <section className="space-y-6">
          {products.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-slate-500">No products found in this category yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
