"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="relative flex flex-col overflow-hidden z-10">
      {/* Apply a background overlay or glow to the text for better visibility */}
      <ContainerScroll
        titleComponent={
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white space-y-2 text-center bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
              Explore the Infinite <br />
              <span className="text-4xl sm:text-5xl md:text-[6rem] font-bold mt-2 text-indigo-400 leading-none animate-pulse">
                Cosmic Shopping
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 text-center">
              Dive into a galaxy of exclusive space-themed products, where each
              click takes you deeper into the stars!
            </p>
          </div>
        }
      >
        <Image
          src={`/scroll3.jpeg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
