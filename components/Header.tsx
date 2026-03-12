import Image from "next/image";
import Link from "next/link";
import CartButton from "./CartButton";
import SearchInput from "./SearchInput";
import HeaderBottom from "./HeaderBottom";
import DeliverTo from "./DeliverTo";

const Header = () => {
  return (
    <header className="bg-transparent sticky top-0 z-50">
      <div className="w-full h-14 bg-[#131921] text-lightText sticky top-0 z-50">
        <div className="h-full w-full mx-auto inline-flex items-center md:justify-between gap-1 px-3">
          {/* Logo */}
          <Link href={"/"}>
            <div className="headerItem">
              <Image
                className="w-28 object-cover mt-1"
                src="/logo.png"
                alt="logo"
                width={112}
                height={40}
                priority
              />
            </div>
          </Link>
          {/* Deliver */}
          <DeliverTo />
          <SearchInput />
          {/* Language */}
          <div className="hidden md:flex items-end gap-1 px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-4 flex-shrink-0">
              <rect width="900" height="600" fill="#138808"/>
              <rect width="900" height="400" fill="#fff"/>
              <rect width="900" height="200" fill="#FF9933"/>
              <circle cx="450" cy="300" r="90" fill="none" stroke="#000080" strokeWidth="9"/>
              <circle cx="450" cy="300" r="12" fill="#000080"/>
              {Array.from({ length: 24 }, (_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x2 = 450 + 90 * Math.sin(rad);
                const y2 = 300 - 90 * Math.cos(rad);
                return <line key={i} x1="450" y1="300" x2={x2} y2={y2} stroke="#000080" strokeWidth="4"/>;
              })}
            </svg>
            <span className="text-sm text-white font-bold self-end">EN</span>
            <svg className="w-3 h-3 text-white mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
          {/* Sign In */}
          <Link
            href={"/login"}
            className="text-sm text-gray-100 flex flex-col justify-center leading-none px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p className="text-xs">Hello, Sign in</p>
            <p className="text-white font-bold">Account &amp; Lists</p>
          </Link>
          {/* Returns & Orders */}
          <Link
            href={"/orders"}
            className="text-sm text-gray-100 flex flex-col justify-center leading-none px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p className="text-xs">Returns</p>
            <p className="text-white font-bold">&amp; Orders</p>
          </Link>
          {/* Cart */}
          <CartButton />
        </div>
      </div>
      <HeaderBottom />
    </header>
  );
};

export default Header;
