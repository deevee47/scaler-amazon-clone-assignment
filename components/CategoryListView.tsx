"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const categories = [
  "All",
  "Electronics",
  "Computers",
  "Smart Home",
  "Books",
  "Fashion",
  "Toys & Games",
  "Gift Cards",
];

const CategoryListView = () => {
  const [selected, setSelected] = useState("All");
  const [width, setWidth] = useState(52);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth + 32); // 32px for padding + chevron
    }
  }, [selected]);

  return (
    <div className="relative h-full" style={{ width: `${width}px` }}>
      {/* Hidden span to measure text width */}
      <span
        ref={measureRef}
        className="absolute invisible whitespace-nowrap text-sm px-2.5"
      >
        {selected}
      </span>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full h-full rounded-tl-md rounded-bl-md bg-[#E5E5E5] text-black/80 text-sm px-2 pr-6 border-r border-gray-300 appearance-none cursor-pointer focus:outline-none focus:border-amazonOrange"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60 pointer-events-none" />
    </div>
  );
};

export default CategoryListView;
