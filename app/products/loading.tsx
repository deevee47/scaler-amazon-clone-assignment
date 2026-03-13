export default function ProductsLoading() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded shadow-sm p-3 flex flex-col gap-2 animate-pulse"
          >
            <div className="w-full aspect-square bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
