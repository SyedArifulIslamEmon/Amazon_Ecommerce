import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    slug: "electronics",
    title: "Electronics",
    description: "Headphones, smart home, 4K TVs, and more",
    image: "/images/categories/electronics.svg",
  },
  {
    slug: "fashion",
    title: "Fashion",
    description: "Trending apparel and accessories",
    image: "/images/categories/fashion.svg",
  },
  {
    slug: "home",
    title: "Home & Kitchen",
    description: "Smart appliances and decor",
    image: "/images/categories/home.svg",
  },
];

export function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Shop by Category</h2>
        <Link href="/categories" className="text-sm font-medium text-blue-600 hover:underline">
          View all categories →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image src={category.image} alt={category.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-semibold">{category.title}</h3>
              <p className="mt-2 text-sm text-slate-100">{category.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-100">
                Shop now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
