import Image from "next/image";
import Link from "next/link";
import HorizontalProductRow from "@/components/HorizontalProductRow";
import BestSellersRow from "@/components/BestSellersRow";
import { apiFetch } from "@/lib/api";

interface SectionProduct {
  id: number;
  title: string;
  thumbnail: string;
}

interface Section {
  title: string;
  category: string;
  seeMore: string;
}

const seeMoreLabels = ["See more", "More in Buy Again", "See more deals", "See more offers", "Explore all"];
const rand = () => seeMoreLabels[Math.floor(Math.random() * seeMoreLabels.length)];

const sections: Section[] = [
  { title: "Pick up where you left off", category: "smartphones", seeMore: rand() },
  { title: "Continue shopping deals", category: "laptops", seeMore: rand() },
  { title: "Keep shopping for", category: "beauty", seeMore: rand() },
  { title: "Get great deals on Electronics", category: "mobile-accessories", seeMore: rand() },
  { title: "Buy again", category: "fragrances", seeMore: rand() },
  { title: "Deals related to items you've saved", category: "furniture", seeMore: rand() },
  { title: "Up to 60% off | Footwear", category: "mens-shoes", seeMore: rand() },
  { title: "Revamp your home in style", category: "home-decoration", seeMore: rand() },
];

async function getSectionProducts(category: string, limit = 4, offset = 0): Promise<SectionProduct[]> {
  const data = await apiFetch<{ products: SectionProduct[] }>(
    `/api/products?category=${category}&limit=${limit}&offset=${offset}`,
    { next: { revalidate: 3600 } }
  );
  return data.products ?? [];
}

const ProductsList = async () => {
  const [allProducts, rowProducts, bestSellersProducts] = await Promise.all([
    Promise.all(sections.map((s) => getSectionProducts(s.category))),
    getSectionProducts("laptops", 10),
    getSectionProducts("mobile-accessories", 10),
  ]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sections.map((section, i) => {
          const products = allProducts[i].slice(0, 4);
          return (
            <div key={section.category} className="bg-white! p-4 flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {products.map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`}>
                    <div className="aspect-square relative bg-gray-50">
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 12vw"
                      />
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">{p.title}</p>
                  </Link>
                ))}
              </div>
              <Link
                href={`/products?category=${section.category}`}
                className="text-sm text-[#2261A1] hover:text-[#c45500] hover:underline mt-auto"
              >
                {section.seeMore}
              </Link>
            </div>
          );
        })}
      </div>
      <HorizontalProductRow title="Top picks in Laptops" products={rowProducts} />
      <BestSellersRow title="Best Sellers in Computers & Accessories" products={bestSellersProducts} />
    </>
  );
};

export default ProductsList;
