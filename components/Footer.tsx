import { footerData } from "@/constants/data";
import Container from "./Container";
import FooterMiddleList from "./FooterMiddleList";
import Image from "next/image";

const subsidiaries = [
  {
    name: "AbeBooks",
    description: "Books, art\n& collectibles",
  },
  {
    name: "Amazon Web Services",
    description: "Scalable Cloud\nComputing Services",
  },
  {
    name: "Audible",
    description: "Download\nAudio Books",
  },
  {
    name: "IMDb",
    description: "Movies, TV\n& Celebrities",
  },
  {
    name: "Shopbop",
    description: "Designer\nFashion Brands",
  },
  {
    name: "Amazon Business",
    description: "Everything For\nYour Business",
  },
  {
    name: "Amazon Prime Music",
    description:
      "100 million songs, ad-free\nOver 15 million podcast\nepisodes",
  },
];

const Footer = () => {
  return (
    <div className="text-lightText">
      {/* Back to top */}
      <div className="bg-[#37475B] text-center py-3 cursor-pointer hover:bg-[#485769] transition-colors duration-200">
        <span className="text-sm text-white">Back to top</span>
      </div>

      {/* Main footer links */}
      <div className="bg-[#242F3E]">
        <Container className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerData.map((item) => (
            <FooterMiddleList
              key={item._id}
              title={item.title}
              listItem={item.listItem}
            />
          ))}
        </Container>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 bg-[#242F3E]" />

      {/* Logo + language/country selectors */}
      <div className="bg-[#242F3E] py-6">
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <Image
            src="/logo.png"
            alt="Amazon"
            width={90}
            height={28}
            className="object-contain"
          />
          <select className="bg-transparent border ml-12 border-gray-500 text-white text-sm rounded px-3 py-1.5 cursor-pointer appearance-none pr-7 pl-3">
            <option value="en">🌐 English</option>
          </select>
          <select className="bg-transparent border border-gray-500 text-white text-sm rounded px-3 py-1.5 cursor-pointer appearance-none pr-7 pl-3">
            <option value="in">🇮🇳 India</option>
          </select>
        </div>
      </div>

      {/* Subsidiaries */}
      <div className="bg-[#121A22] py-8">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
            {subsidiaries.map((item) => (
              <div key={item.name} className="cursor-pointer group">
                <p className="text-white text-sm font-medium group-hover:underline">
                  {item.name}
                </p>
                <p className="text-gray-400 text-xs mt-0.5 whitespace-pre-line leading-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#121A22] border-t border-gray-700 flex flex-col items-center py-4 gap-2">
        <ul className="flex flex-wrap justify-center gap-4">
          {[
            "Conditions of Use & Sale",
            "Privacy Notice",
            "Interest-Based Ads",
          ].map((link) => (
            <li
              key={link}
              className="text-[12px] text-[#DDD] hover:underline cursor-pointer"
            >
              {link}
            </li>
          ))}
        </ul>
        <p className="text-[12px] text-[#DDD]">
          © 1996-2026, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Footer;
