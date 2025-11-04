"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  addressLine1: z.string().min(3, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  cardNumber: z.string().min(12, "Card number is required"),
  expiry: z.string().min(4, "Expiry is required"),
  cvv: z.string().min(3, "CVV is required"),
});

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Checkout submitted", data);
  });

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-sm text-slate-500">Secure payment powered by Stripe.</p>
      </header>
      <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Shipping Details</h2>
            <p className="text-sm text-slate-500">Where should we deliver your order?</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input
                {...register("fullName")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                placeholder="Jane Doe"
              />
              {errors.fullName ? <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p> : null}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                {...register("email")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                placeholder="jane@example.com"
              />
              {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : null}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Address Line 1</label>
              <input
                {...register("addressLine1")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                placeholder="123 Main St"
              />
              {errors.addressLine1 ? (
                <p className="mt-1 text-xs text-red-500">{errors.addressLine1.message}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Address Line 2</label>
              <input
                {...register("addressLine2")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">City</label>
                <input
                  {...register("city")}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                />
                {errors.city ? <p className="mt-1 text-xs text-red-500">{errors.city.message}</p> : null}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">State</label>
                <input
                  {...register("state")}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Postal Code</label>
                <input
                  {...register("postalCode")}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                />
                {errors.postalCode ? <p className="mt-1 text-xs text-red-500">{errors.postalCode.message}</p> : null}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Country</label>
                <input
                  {...register("country")}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                  placeholder="United States"
                />
                {errors.country ? <p className="mt-1 text-xs text-red-500">{errors.country.message}</p> : null}
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Payment Details</h2>
            <p className="text-sm text-slate-500">Transactions are securely processed by Stripe.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Card Number</label>
              <input
                {...register("cardNumber")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                placeholder="4242 4242 4242 4242"
              />
              {errors.cardNumber ? <p className="mt-1 text-xs text-red-500">{errors.cardNumber.message}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Expiry</label>
                <input
                  {...register("expiry")}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                  placeholder="12 / 26"
                />
                {errors.expiry ? <p className="mt-1 text-xs text-red-500">{errors.expiry.message}</p> : null}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">CVV</label>
                <input
                  {...register("cvv")}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                  placeholder="123"
                />
                {errors.cvv ? <p className="mt-1 text-xs text-red-500">{errors.cvv.message}</p> : null}
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Complete Order
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
