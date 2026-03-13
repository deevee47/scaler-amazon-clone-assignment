import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import ProductsList from "@/components/ProductsList";
import Image from "next/image";
import SponsoredBanner from "@/components/SponsoredBanner";

const bannerImages = [
  { title: "bannerOne", src: "/banner/bannerOne.jpg" },
  { title: "bannerTwo", src: "/banner/bannerTwo.jpg" },
  { title: "bannerThree", src: "/banner/bannerThree.jpg" },
  { title: "bannerFour", src: "/banner/bannerFour.jpg" },
  { title: "bannerFive", src: "/banner/bannerFive.jpg" },
];

export default function Home() {
  return (
    <div className="bg-[#E4E6E6]">
      {/* Banner carousel with overlapping products below */}
      <div className="relative">
        <Carousel opts={{ loop: true }} autoPlay autoPlayDelay={10000}>
          <CarouselContent>
            {bannerImages.map((item) => (
              <CarouselItem key={item.title}>
                <Image
                  src={item.src}
                  alt={item.title}
                  className="w-full object-cover"
                  width={1500}
                  height={500}
                  priority={item.title === "bannerOne"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Products overlay — pulled up significantly over the banner */}
        <div className="relative z-10 -mt-80 px-6">
          <ProductsList />
        </div>
        <SponsoredBanner />
            
      </div>
    </div>
  );
}
