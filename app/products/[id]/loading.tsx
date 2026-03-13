export default function ProductDetailLoading() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      {/* Breadcrumb */}
      <div className="px-6 py-1.5 border-b border-gray-200">
        <div className="h-3 w-64 bg-gray-200 rounded" />
      </div>

      {/* Main layout */}
      <div className="flex gap-5 px-6 py-4 items-start">

        {/* Gallery column */}
        <div className="flex-shrink-0">
          {/* Thumbnails + main image */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-14 h-14 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="w-[370px] h-[370px] bg-gray-200 rounded" />
          </div>

          {/* Ask Rufus */}
          <div className="mt-4 w-[460px] flex flex-col gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="flex gap-2 flex-wrap">
              <div className="h-6 w-32 bg-gray-200 rounded-full" />
              <div className="h-6 w-28 bg-gray-200 rounded-full" />
              <div className="h-6 w-44 bg-gray-200 rounded-full" />
            </div>
            <div className="h-7 w-36 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Product info column */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-6 bg-gray-200 rounded w-4/5" />

          {/* Brand */}
          <div className="h-4 bg-gray-200 rounded w-40" />

          {/* Rating row */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          {/* 100+ bought */}
          <div className="h-4 w-44 bg-gray-200 rounded" />

          <div className="h-px bg-gray-200 my-1" />

          {/* Deal badge */}
          <div className="h-7 w-32 bg-gray-200 rounded" />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <div className="h-6 w-14 bg-gray-200 rounded" />
            <div className="h-9 w-28 bg-gray-200 rounded" />
          </div>

          {/* MRP + EMI + Business */}
          <div className="h-4 w-56 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-200 rounded" />

          {/* Fulfilled badge */}
          <div className="h-5 w-32 bg-gray-200 rounded" />
          {/* Tax */}
          <div className="h-3 w-36 bg-gray-200 rounded" />

          {/* Offers */}
          <div className="mt-1">
            <div className="h-5 w-20 bg-gray-200 rounded mb-2" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex-1 border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Color swatches */}
          <div className="mt-1">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-[55px] h-[55px] bg-gray-200 rounded border border-gray-200" />
                  <div className="h-3 w-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Service icons */}
          <div className="flex items-start border-t border-gray-200 pt-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 w-[76px]">
                <div className="w-9 h-9 bg-gray-200 rounded-full" />
                <div className="h-3 w-14 bg-gray-200 rounded" />
                <div className="h-3 w-10 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Description bullets */}
          <div className="mt-1">
            <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
            <div className="flex flex-col gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded" style={{ width: `${75 + (i % 3) * 8}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Buy box column */}
        <div className="w-[255px] flex-shrink-0 flex flex-col gap-2.5">
          {/* Prime card */}
          <div className="border border-[#C8E6F5] rounded-xl bg-[#EBF5FB] px-4 py-4 flex flex-col gap-2">
            <div className="h-7 w-20 bg-blue-200 rounded" />
            <div className="h-3 w-full bg-blue-100 rounded" />
            <div className="h-3 w-5/6 bg-blue-100 rounded" />
            <div className="h-3 w-4/6 bg-blue-100 rounded" />
            <div className="h-4 w-44 bg-blue-200 rounded" />
          </div>

          {/* Main buy box */}
          <div className="border border-[#D5D9D9] rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-2.5">
              {/* Price */}
              <div className="h-9 w-32 bg-gray-200 rounded" />
              {/* Fulfilled */}
              <div className="h-5 w-28 bg-gray-200 rounded" />
              {/* Delivery */}
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
              {/* Location */}
              <div className="h-4 w-full bg-gray-200 rounded" />
              {/* Stock */}
              <div className="h-5 w-20 bg-gray-200 rounded" />
              {/* Ships from table */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded" />
                ))}
              </div>
              {/* See more */}
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-px bg-gray-200" />
              {/* Protection plan */}
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-px bg-gray-200" />
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="flex-1 h-8 bg-gray-200 rounded" />
              </div>
              {/* Buttons */}
              <div className="h-10 w-full bg-yellow-200 rounded-full" />
              <div className="h-10 w-full bg-orange-200 rounded-full" />
              {/* Wish list */}
              <div className="h-9 w-full bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="pl-6 pr-[154px] py-6 border-t border-gray-200">
        <div className="h-6 w-80 bg-gray-200 rounded mb-4" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[200px] flex flex-col gap-2">
              <div className="w-full aspect-square bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-4/5 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-5 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-36 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
