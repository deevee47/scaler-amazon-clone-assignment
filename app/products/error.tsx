"use client";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-16 text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Failed to load products
      </h2>
      <p className="text-sm text-gray-500 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium text-sm px-6 py-2 rounded-full border border-[#FCD200]"
      >
        Try again
      </button>
    </div>
  );
}
