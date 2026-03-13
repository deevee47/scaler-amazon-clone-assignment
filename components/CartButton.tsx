"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { store } from "@/lib/store";

const CartButton = () => {
  const { cartItems, fetchCart } = store();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Link
      href={"/cart"}
      className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
    >
      <div className="relative">
        <Image
          src="/cartIcon.png"
          alt="cartIcon"
          width={40}
          height={32}
          className="w-auto object-cover h-8"
        />
        <p className="absolute top-0 left-[58%] -translate-x-[52%] text-amazonOrangeDark text-md font-bold leading-none">
          {cartItems.length}
        </p>
      </div>
      <p className="text-md text-white font-bold mt-3">Cart</p>
    </Link>
  );
};

export default CartButton;
