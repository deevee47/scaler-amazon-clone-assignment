"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export default function HorizontalProductRow({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <div className="bg-white! p-4 mt-3">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <Carousel opts={{ align: "start", dragFree: true }}>
        <CarouselContent>
          {products.map((p) => (
            <CarouselItem
              key={p.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Link href={`/products/${p.id}`} className="block">
                <div className="aspect-[4/3] relative bg-gray-50">
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    className="object-contain"
                    sizes="20vw"
                  />
                </div>
                <p className="text-xs text-gray-700 truncate mt-1">{p.title}</p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-gray-600! hover:text-gray-900! left-0" />
        <CarouselNext className="text-gray-600! hover:text-gray-900! right-0" />
      </Carousel>
    </div>
  );
}
