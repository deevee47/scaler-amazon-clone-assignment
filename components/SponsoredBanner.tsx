import Image from "next/image";
import Link from "next/link";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <svg
              key={star}
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {filled ? (
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill="#FFA41C"
                />
              ) : half ? (
                <>
                  <defs>
                    <linearGradient id={`half-${star}`}>
                      <stop offset="50%" stopColor="#FFA41C" />
                      <stop offset="50%" stopColor="#D1D5DB" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                    fill={`url(#half-${star})`}
                  />
                </>
              ) : (
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill="#D1D5DB"
                />
              )}
            </svg>
          );
        })}
      </div>
      <span className="text-sm text-[#007185] hover:text-[#c45500] cursor-pointer">
        ({count.toLocaleString()})
      </span>
    </div>
  );
}

export default function SponsoredBanner() {
  return (
    <div className="mt-3">
      <div className="bg-white! rounded-sm p-6 flex flex-col gap-4 relative">
        <h2 className="text-xl font-bold text-gray-900">Best Deal For You</h2>
        <div className="flex items-center gap-6">
        {/* Brand logo */}
        <div className="flex-shrink-0 w-44 h-28 flex items-center justify-center border border-gray-200 rounded">
          <div className="bg-[#C8102E] text-white px-3 py-2 text-center rounded">
            <div className="text-2xl font-black leading-tight tracking-tight">
              AMERICAN
            </div>
            <div className="text-2xl font-black leading-tight tracking-tight">
              TOURISTER
            </div>
            <div className="text-sm font-medium tracking-widest mt-0.5">
              SINCE 1933
            </div>
          </div>
        </div>

        {/* Product image */}
        <div className="flex-shrink-0 relative w-60 h-52">
          <Image
            src="https://m.media-amazon.com/images/I/41GuKTTNraL._SX300_SY300_QL70_FMwebp_.jpg"
            alt="American Tourister luggage set"
            fill
            className="object-contain"
            sizes="208px"
          />
        </div>

        {/* Product details */}
        <div className="flex flex-col gap-1.5 flex-1">
          <Link
            href="/products/26"
            className="text-[#007185] hover:text-[#c45500] hover:underline font-medium text-2xl leading-snug"
          >
            American Tourister 3PC Ivy 2.0-8 Wheel, Set (Small...
          </Link>

          <StarRating rating={4.5} count={6736} />

          <span className="inline-flex w-fit bg-[#CC0C39] text-white text-sm font-semibold px-2 py-0.5 rounded-sm">
            Limited time deal
          </span>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl text-black font-medium">
              <span className="text-md">₹</span>8,999
              <span className="text-sm align-super">00</span>
            </span>
            <span className="text-md text-gray-500 line-through">
              ₹25,700.00
            </span>
            <span className="flex items-center gap-0.5 text-md">
              <svg
                className="w-3.5 h-3.5 text-[#007185]"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
              <span className="font-bold italic text-[#007185] text-base tracking-tight">
                prime
              </span>
            </span>
          </div>

          <button className="w-fit mt-1 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-sm px-6 py-2 rounded-full border border-[#FCD200]">
            Shop now
          </button>
        </div>

        </div>

        {/* Sponsored label */}
        <div className="absolute bottom-2 right-3 text-xs text-gray-400">
          Sponsored
        </div>
      </div>
    </div>
  );
}
