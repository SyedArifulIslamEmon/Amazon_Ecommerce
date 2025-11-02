"use client";

import * as React from "react";

interface SliderProps {
  value: [number, number];
  onValueChange: (value: number[]) => void;
  max?: number;
  step?: number;
}

export function Slider({ value, onValueChange, max = 100, step = 1 }: SliderProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value, 10);
    onValueChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10);
    onValueChange([value[0], newMax]);
  };

  return (
    <div className="mt-3 space-y-2">
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleMinChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
      />
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value[1]}
        onChange={handleMaxChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
      />
    </div>
  );
}
