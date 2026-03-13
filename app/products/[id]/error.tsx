"use client";

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Could not load product
      </h2>
      <p className="text-sm text-gray-500">{error.message}</p>
      <button
        onClick={reset}
        className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium text-sm px-6 py-2 rounded-full border border-[#FCD200]"
      >
        Try again
      </button>
    </div>
  );
}
