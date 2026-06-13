"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { GrLocation } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

export default function HeroSection() {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", jobQuery, "in", locationQuery);
    // Add your search redirect/filtering logic here
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center bg-[#020617] text-white px-4 pt-24 overflow-hidden">
      
      {/* Background Radial Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge Announcement */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.02)] mb-8 animate-fade-in">
          <span className="text-base">💼</span>
          <span className="text-xs font-semibold tracking-wider text-gray-300 font-mono uppercase">
            <span className="text-white font-bold">50,000+</span> New Jobs This Month
          </span>
        </div>

        {/* Heading Title */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-3xl leading-[1.15]">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle Description */}
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse thousands of 
          curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar Form Component */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-3xl flex items-center bg-[#101725]/80 border border-white/10 rounded-full p-2 pl-4 pr-2 shadow-2xl backdrop-blur-md focus-within:border-indigo-500/50 transition-all duration-300 gap-2 mb-6"
        >
          {/* Job Title Input Segment */}
          <div className="flex items-center flex-1 gap-2.5 min-w-0">
            <FiSearch className="text-gray-500 text-xl flex-shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none py-2"
            />
          </div>

          {/* Dynamic Segment Divider Line */}
          <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />

          {/* Location Input Segment */}
          <div className="flex items-center flex-1 gap-2.5 min-w-0">
            <GrLocation  className="text-gray-500 text-xl flex-shrink-0" />
            <input
              type="text"
              placeholder="Location or Remote"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none py-2"
            />
          </div>

          {/* Search CTA Trigger Button */}
          <Button
            type="submit"
            isIconOnly
            radius="full"
            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all flex-shrink-0 min-w-11 h-11"
            aria-label="Search jobs"
          >
            <FiSearch className="text-lg" />
          </Button>
        </form>

        {/* Bottom Trending Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-gray-400 font-medium mr-1">Trending Position</span>
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => setJobQuery(position)}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 bg-white/[0.04] border border-white/5 hover:border-white/20 hover:bg-white/[0.08] transition duration-200"
            >
              {position}
            </button>
          ))}
        </div>

      </div>

      {/* Scattered Ambient background stars effect */}
      <div className="absolute bottom-12 left-1/4 w-1 h-1 bg-white/20 rounded-full blur-[1px]" />
      <div className="absolute bottom-24 right-1/4 w-1 h-1 bg-white/40 rounded-full blur-[0.5px]" />
      <div className="absolute bottom-6 right-1/3 w-1.5 h-1.5 bg-white/10 rounded-full" />
    </section>
  );
}