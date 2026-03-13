"use client";
import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import SideNavbar from "./SideNavbar";

const navItems = [
  { label: "Fresh", dropdown: true },
  { label: "Amazon Pay", dropdown: false },
  { label: "MX Player", dropdown: false },
  { label: "Sell", dropdown: false },
  { label: "Gift Cards", dropdown: false },
  { label: "Buy Again", dropdown: false },
  { label: "AmazonBasics", dropdown: false },
  { label: "Gift Ideas", dropdown: false },
  { label: "Amazon Business", dropdown: true },
  { label: "Prime Videos", dropdown: true },
  { label: "Home Improvement", dropdown: false },
  { label: "Health, Household & Personal Care", dropdown: false },
];

const HeaderBottom = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#242F3E] text-white">
      <div className="flex items-center gap-0 py-[6px] pl-2 text-sm overflow-x-auto scrollbar-hide">
        {/* All button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-1 px-3 py-1 font-bold text-white hover:bg-white/10 rounded whitespace-nowrap"
        >
          <Menu className="w-5 h-5" />
          All
        </button>

        {/* Rufus button */}
        <button className="flex items-center gap-1 px-3 py-1 hover:bg-white/10 rounded whitespace-nowrap">
          <span className="font-semibold">Rufus</span>
        </button>

        {/* Nav items */}
        {navItems.map((item) => (
          <button
            key={item.label}
            className="font-semibold flex items-center gap-0.5 px-2 py-1 hover:bg-white/10 rounded whitespace-nowrap text-white/90 hover:text-white"
          >
            {item.label}
            {item.dropdown && <ChevronDown className="w-3.5 h-3.5 mt-0.5" />}
          </button>
        ))}
      </div>

      <SideNavbar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default HeaderBottom;
