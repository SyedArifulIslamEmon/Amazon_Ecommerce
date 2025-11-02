"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/Slider";

interface FilterSidebarProps {
  onFilterChange?: (filters: Record<string, unknown>) => void;
}

const categories = ["Electronics", "Home", "Fashion", "Beauty", "Sports"];
const brands = ["Amazon Basics", "Apple", "Samsung", "Sony", "Logitech"];

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleCheckboxChange = (
    value: string,
    state: string[],
    setter: (value: string[]) => void,
    key: string
  ) => {
    const exists = state.includes(value);
    const next = exists ? state.filter((item) => item !== value) : [...state, value];
    setter(next);
    onFilterChange?.({
      categories: key === "categories" ? next : selectedCategories,
      brands: key === "brands" ? next : selectedBrands,
      price_min: priceRange[0],
      price_max: priceRange[1],
    });
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1] ?? value[0]];
    setPriceRange(range);
    onFilterChange?.({
      categories: selectedCategories,
      brands: selectedBrands,
      price_min: range[0],
      price_max: range[1],
    });
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Price Range</h3>
          <p className="text-sm text-slate-500">${priceRange[0]} - ${priceRange[1]}</p>
          <Slider value={priceRange} onValueChange={handlePriceChange} max={1000} step={10} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category, selectedCategories, setSelectedCategories, "categories")}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Brands</h3>
          <div className="mt-3 space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleCheckboxChange(brand, selectedBrands, setSelectedBrands, "brands")}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
