export default function ProductDetailLoading() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="px-6 py-1.5 border-b border-gray-200">
        <div className="h-3 w-64 bg-gray-200 rounded" />
      </div>

      {/* Main layout */}
      <div className="flex gap-5 px-6 py-4 items-start">
        {/* Gallery skeleton */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-14 h-14 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="w-80 h-80 bg-gray-200 rounded" />
        </div>

        {/* Product info skeleton */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="h-6 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-1/5 mt-2" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-2/5" />
          <div className="flex gap-3 mt-4">
            <div className="h-24 bg-gray-200 rounded flex-1" />
            <div className="h-24 bg-gray-200 rounded flex-1" />
          </div>
        </div>

        {/* Buy box skeleton */}
        <div className="w-[255px] flex-shrink-0 border border-gray-200 rounded">
          <div className="p-4 flex flex-col gap-3">
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-10 bg-gray-200 rounded w-full mt-2" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
