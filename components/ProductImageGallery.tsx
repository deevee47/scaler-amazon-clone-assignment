"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const maxThumbs = 6;
  const visibleThumbs = images.slice(0, maxThumbs);
  const extraCount = images.length - maxThumbs;

  return (
    <div className="flex gap-2 flex-shrink-0">
      {/* Thumbnail strip */}
      <div className="flex flex-col gap-2 w-[55px]">
        {visibleThumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`relative w-[55px] h-[55px] border rounded flex-shrink-0 overflow-hidden ${
              selectedIndex === i
                ? "border-[#c45500] border-2"
                : "border-gray-300 hover:border-[#c45500]"
            }`}
          >
            {i === 1 && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10 gap-0.5">
                <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-gray-800 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white text-[9px] font-semibold tracking-wide">
                  VIDEO
                </span>
              </div>
            )}
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              className="object-contain p-1"
              sizes="55px"
            />
          </button>
        ))}
        {extraCount > 0 && (
          <button
            onClick={() => setSelectedIndex(maxThumbs)}
            className="w-[55px] h-[55px] border border-gray-300 rounded flex items-center justify-center text-sm text-gray-700 font-medium hover:border-[#c45500]"
          >
            {extraCount}+
          </button>
        )}
      </div>

      {/* Main image area */}
      <div className="w-[580px] flex-shrink-0 flex flex-col relative">
        {/* Share icon — top right of image area */}
        <div className="absolute top-0 right-0 z-10">
          <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-full bg-white hover:bg-gray-50 shadow-sm">
            <svg
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div className="relative flex-1 min-h-[520px]">
          <Image
            src={images[selectedIndex]}
            alt={title}
            fill
            className="object-contain p-8"
            sizes="580px"
            priority
          />
        </div>

        {/* Full view link */}
        <div className="text-center py-2 border-t border-gray-100">
          <span className="text-sm text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline">
            Click to see full view
          </span>
        </div>
      </div>
    </div>
  );
}
