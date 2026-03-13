"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { Product } from "@/type";
import CategoryListView from "./CategoryListView";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced API search — fires 5s after user stops typing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/products?search=${encodeURIComponent(searchQuery)}&limit=10&offset=0`
      )
        .then((r) => r.json())
        .then((j) => setResults(j.data?.products ?? []));
    }, 5000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="flex-1 h-10 mx-4 hidden md:inline-flex items-center justify-between relative"
    >
      <CategoryListView />
      <input
        className="w-full h-full bg-white rounded-tr-md rounded-br-md px-2 placeholder:text-md text-base text-black placeholder:text-black/70 border-[3px] border-transparent outline-none focus-visible:border-amazonOrange"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search Amazon.in"
        onFocus={() => setIsInputFocused(true)}
      />
      {searchQuery && (
        <MdOutlineClose
          onClick={() => { setSearchQuery(""); setResults([]); }}
          className="text-xl text-amazonLight hover:text-red-600 absolute right-14 duration-200 cursor-pointer"
        />
      )}
      <span className="w-12 h-full bg-[#FEBD6A] hover:bg-[#f3a847] duration-200 cursor-pointer text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
        <HiOutlineSearch />
      </span>
      {isInputFocused && searchQuery && (
        <div className="absolute left-0 top-12 w-full mx-auto h-auto max-h-96 bg-white rounded-md overflow-y-scroll cursor-pointer text-black">
          {results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((item: Product) => (
                <Link
                  key={item?.id}
                  href={`/products/${item?.id}`}
                  onClick={() => { setSearchQuery(""); setResults([]); }}
                  className="flex items-center gap-x-2 text-base font-medium hover:bg-lightText/30 px-3 py-1.5"
                >
                  <CiSearch className="text-lg" /> {item?.title}
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-10 px-5">
              <p className="text-base">
                Nothing matched with{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                  {searchQuery}
                </span>{" "}
                please try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
