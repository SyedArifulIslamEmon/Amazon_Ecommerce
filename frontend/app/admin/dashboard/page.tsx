"use client";

import { ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react";

const metrics = [
  { label: "Total Revenue", value: "$43,291", icon: DollarSign, change: "+12.4%" },
  { label: "Orders", value: "1,342", icon: ShoppingBag, change: "+8.2%" },
  { label: "Customers", value: "3,897", icon: Users, change: "+15.3%" },
  { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, change: "+2.1%" },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-slate-500">Monitor and manage your AI-powered eCommerce platform.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <metric.icon className="h-5 w-5 text-slate-500" />
              <span className="text-xs font-semibold text-green-600">{metric.change}</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-600">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-3 text-left">Order ID</th>
                <th className="py-3 text-left">Customer</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-900">#ORD-1234</td>
                <td className="py-3">John Doe</td>
                <td className="py-3 font-medium">$329.00</td>
                <td className="py-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Shipped
                  </span>
                </td>
                <td className="py-3">2 hours ago</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-900">#ORD-1233</td>
                <td className="py-3">Jane Smith</td>
                <td className="py-3 font-medium">$154.99</td>
                <td className="py-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Processing
                  </span>
                </td>
                <td className="py-3">4 hours ago</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-900">#ORD-1232</td>
                <td className="py-3">Bob Johnson</td>
                <td className="py-3 font-medium">$89.00</td>
                <td className="py-3">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Pending
                  </span>
                </td>
                <td className="py-3">6 hours ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
