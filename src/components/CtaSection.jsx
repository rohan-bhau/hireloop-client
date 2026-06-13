"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
// Replace this import with your actual background image file path
import gridBg from "@/assets/images/cta-bg.png"; 

export default function CtaSection() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-black overflow-hidden px-4 py-20">
      
      {/* 1. The Curved Grid Background Image Layer */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none opacity-80 mix-blend-screen">
        <Image
          src={gridBg}
          alt="Curved grid background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* 2. Top-Centered Blue Core Radial Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none select-none mix-blend-plus-lighter" />

      {/* 3. Section Content Layer */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4 leading-[1.2]">
          Your next role is <br className="sm:hidden" /> already looking for you
        </h2>

        {/* Subtitle Description */}
        <p className="text-sm md:text-base text-zinc-400 font-normal max-w-xl mb-8 leading-relaxed">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Interactive Call to Action Actions */}
        <div className="flex flex-row items-center justify-center gap-4 w-full sm:w-auto">
          
          {/* Create Free Account Primary Button */}
          <Button
            as={Link}
            href="/auth/signup"
            className="bg-white text-black font-medium hover:bg-zinc-200 transition duration-200 h-11 px-6 rounded-xl text-sm"
          >
            Create a free account
          </Button>

          {/* View Pricing Secondary Bordered Button */}
          <Button
            as={Link}
            href="/pricing"
            variant="bordered"
            className="bg-zinc-950/40 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition duration-200 h-11 px-6 rounded-xl text-sm backdrop-blur-sm"
          >
            View pricing
          </Button>
          
        </div>
      </div>
    </section>
  );
}