"use client";

import React from "react";
import { Card } from "@heroui/react";

/**
 * StatsGrid Component
 * @param {Array} items - Array of metric objects to display
 * @param {string} items[].label - Title of the metric (e.g., "Total Applications")
 * @param {number|string} items[].value - The stat count (e.g., 142)
 * @param {React.Component} items[].icon - The Gravity UI icon component
 * @param {string} items[].color - Tailwind class for the icon bg/text accent (e.g., "text-indigo-500 bg-indigo-500/10")
 */
export default function StatsGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {items.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <Card 
            key={index} 
            className="p-5 border border-white/5 bg-[#0f172a]/60 backdrop-blur-md flex flex-row items-center justify-between gap-4"
          >
            {/* Left: Text Information */}
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs font-medium text-gray-400 tracking-wide uppercase truncate">
                {item.label}
              </span>
              <span className="text-3xl font-bold text-white tracking-tight">
                {item.value}
              </span>
            </div>

            {/* Right: Dynamic Gravity UI Accent Icon Container */}
            <div className={`p-3.5 rounded-xl flex-shrink-0 flex items-center justify-center ${item.color}`}>
              {IconComponent && <IconComponent className="size-6" />}
            </div>
          </Card>
        );
      })}
    </div>
  );
}