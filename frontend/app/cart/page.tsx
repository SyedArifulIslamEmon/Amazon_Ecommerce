import { removeFromCart, updateCartItem } from "@/app/actions/cart";

const demoCart = [
  {
    id: "1",
    title: "Wireless Noise-Cancelling Headphones",
    quantity: 1,
    price: 199.99,
    image: "/images/placeholders/product-placeholder.svg",
  },
  {
    id: "2",
    title: "Smart Home Hub",
    quantity: 2,
    price: 129.99,
    image: "/images/placeholders/product-placeholder.svg",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function CartPage() {
  const subtotal = demoCart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 12;
  const total = subtotal + tax + shipping;

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <header className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Your cart</p>
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-sm text-slate-500">Review your items and proceed to checkout.</p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <section className="space-y-4">
          {demoCart.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-28 w-28 rounded-xl border border-slate-200 object-cover"
              />
              <div className="flex flex-1 flex-col gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                  <p className="text-sm text-slate-500">Ships in 2-3 business days</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <form
                    action={async (formData) => {
                      "use server";
                      const nextQty = Number(formData.get("quantity"));
                      await updateCartItem(item.id, nextQty);
                    }}
                    className="flex items-center gap-2"
                  >
                    <label htmlFor={`quantity-${item.id}`} className="text-xs uppercase tracking-wide text-slate-500">
                      Qty
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      name="quantity"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="w-20 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                    <button
                      type="submit"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Update
                    </button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      await removeFromCart(item.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  </form>
                  <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    Save for later
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">{formatCurrency(item.price)}</p>
                <p className="text-xs text-slate-400">In stock</p>
              </div>
            </article>
          ))}
        </section>
        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Subtotal</dt>
              <dd className="font-medium text-slate-900">{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Shipping</dt>
              <dd className="font-medium text-slate-900">{formatCurrency(shipping)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Estimated tax</dt>
              <dd className="font-medium text-slate-900">{formatCurrency(tax)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
              <dt className="text-base font-semibold text-slate-900">Total</dt>
              <dd className="text-base font-semibold text-slate-900">{formatCurrency(total)}</dd>
            </div>
          </dl>
          <a
            href="/checkout"
            className="block w-full rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Proceed to Checkout
          </a>
        </aside>
      </div>
    </div>
  );
}
