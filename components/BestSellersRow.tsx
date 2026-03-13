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

export default function BestSellersRow({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <div className="bg-white! p-4 mt-3">
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <Carousel opts={{ align: "start", dragFree: true }}>
        <CarouselContent className="-ml-2">
          {products.map((p) => (
            <CarouselItem
              key={p.id}
              className="pl-2 basis-1/4 sm:basis-1/5 md:basis-[14%] lg:basis-[12.5%]"
            >
              <Link href={`/products/${p.id}`} className="block">
                <div className="relative h-40 bg-white">
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    className="object-contain"
                    sizes="12vw"
                  />
                </div>
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
