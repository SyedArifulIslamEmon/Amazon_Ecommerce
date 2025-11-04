import { ProductList } from "@/components/ProductList";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedCategories } from "@/components/FeaturedCategories";

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <FeaturedCategories />
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Products</h2>
          <a href="/products" className="text-sm font-medium text-blue-600 hover:underline">
            View all →
          </a>
        </div>
        <ProductList />
      </section>
    </div>
  );
}
