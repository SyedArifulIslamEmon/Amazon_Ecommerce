import { notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { getProductBySlug } from "@/lib/api";
import type { Product } from "@/types";
import { addToCart } from "@/app/actions/cart";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let product: Product | null = null;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error(error);
    notFound();
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src={product.images?.[0] ?? "/images/placeholders/product-placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative h-24 overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <Image src={image} alt={`${product.title} - ${index + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase text-blue-600">{product.category}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{product.title}</h1>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.floor(product.rating) ? "h-5 w-5 fill-amber-400 text-amber-400" : "h-5 w-5 text-slate-300"
                    }
                  />
                ))}
                <span className="text-sm text-slate-600">
                  {product.rating.toFixed(1)} ({product.num_reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-4">
            <p className="text-3xl font-semibold text-slate-900">{formatCurrency(product.price)}</p>
            {product.original_price ? (
              <p className="text-lg text-slate-400 line-through">
                {formatCurrency(product.original_price)}
              </p>
            ) : null}
          </div>
          <p className="text-slate-600">{product.description}</p>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Features</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-slate-600">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4">
            <form className="flex-1">
              <button
                formAction={async () => {
                  "use server";
                  await addToCart(product.id, 1);
                }}
                className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Add to Cart
              </button>
            </form>
            <button className="rounded-full border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Add to Wishlist
            </button>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p>
              <strong>Stock:</strong> {product.stock > 0 ? "In Stock" : "Out of Stock"} ({product.stock} available)
            </p>
            <p className="mt-1">
              <strong>Brand:</strong> {product.brand ?? "N/A"}
            </p>
            <p className="mt-1">
              <strong>SKU:</strong> {product.id}
            </p>
          </div>
        </div>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-semibold">Specifications</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="text-sm">
              <dt className="font-semibold text-slate-900">{key}</dt>
              <dd className="text-slate-600">{String(value)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
