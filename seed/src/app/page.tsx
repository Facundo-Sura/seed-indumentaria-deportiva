"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Home from "./home/page";

export default function Landing() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/home">
        <button className="bg-black text-white w-60 h-20 rounded-2xl text-2xl hover:cursor-pointer">
          go to
        </button>
      </Link>
    </div>
  );
}
