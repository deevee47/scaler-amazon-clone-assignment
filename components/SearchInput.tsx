"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { Product } from "@/type";
import CategoryListView from "./CategoryListView";
import { useDebounce } from "@/hooks/useDebounce";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setSearching(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/products?search=${encodeURIComponent(debouncedQuery)}&limit=10&offset=0`
    )
      .then((r) => r.json())
      .then((j) => {
        setResults(j.data?.products ?? []);
        setSearching(false);
        setSearched(true);
      });
  }, [debouncedQuery]);

  // Show "Searching…" as soon as query changes but debounce hasn't fired yet
  useEffect(() => {
    if (searchQuery.trim()) {
      setSearching(true);
      setSearched(false);
    } else {
      setResults([]);
      setSearching(false);
      setSearched(false);
    }
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

  function handleClear() {
    setSearchQuery("");
    setResults([]);
    setSearching(false);
    setSearched(false);
  }

  return (
    <div
      ref={searchContainerRef}
      className="flex-1 h-10 mx-2 sm:mx-4 inline-flex items-center justify-between relative"
    >
      <div className="hidden sm:block h-full">
        <CategoryListView />
      </div>
      <input
        className="w-full h-full bg-white rounded-tl-md rounded-bl-md sm:rounded-tl-none sm:rounded-bl-none rounded-tr-md rounded-br-md px-2 placeholder:text-md text-base text-black placeholder:text-black/70 border-[3px] border-transparent outline-none focus-visible:border-amazonOrange"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search Amazon.in"
        onFocus={() => setIsInputFocused(true)}
      />
      {searchQuery && (
        <MdOutlineClose
          onClick={handleClear}
          className="text-xl text-amazonLight hover:text-red-600 absolute right-14 duration-200 cursor-pointer"
        />
      )}
      <span className="w-12 h-full bg-[#FEBD6A] hover:bg-[#f3a847] duration-200 cursor-pointer text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
        <HiOutlineSearch />
      </span>
      {isInputFocused && searchQuery && (
        <div className="absolute left-0 top-12 w-full mx-auto h-auto max-h-96 bg-white rounded-md overflow-y-scroll cursor-pointer text-black">
          {searching ? (
            <div className="py-6 px-5 text-sm text-gray-500">Searching…</div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((item: Product) => (
                <Link
                  key={item?.id}
                  href={`/products/${item?.id}`}
                  onClick={() => { setSearchQuery(""); setResults([]); setSearched(false); }}
                  className="flex items-center gap-x-2 text-base font-medium hover:bg-lightText/30 px-3 py-1.5"
                >
                  <CiSearch className="text-lg" /> {item?.title}
                </Link>
              ))}
            </div>
          ) : searched ? (
            <div className="py-10 px-5">
              <p className="text-base">
                Nothing matched with{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                  {searchQuery}
                </span>{" "}
                please try again.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
