"use client";

import Image from "next/image";
import globe from '@/assets/images/globe.png'

import {
  Briefcase,
 Factory,
  Magnifier,
  StarFill,
} from "@gravity-ui/icons";

import { Button } from "@heroui/react";

const stats = [
  {
    icon: <Briefcase className="w-5 h-5" />,
    value: "50K+",
    label: "Active Jobs",
  },
  {
    icon: <Factory className="w-5 h-5" />,
    value: "12K+",
    label: "Companies",
  },
  {
    icon: <Magnifier className="w-5 h-5" />,
    value: "2M+",
    label: "Job Seekers",
  },
  {
    icon: <StarFill className="w-5 h-5" />,
    value: "97%",
    label: "Success Rate",
  },
];

export default function StatsSection() {
  return (
    <section suppressHydrationWarning className="relative overflow-hidden min-h-screen bg-black text-white">
      {/* Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={globe}
          alt="Globe"
          fill
          priority
          className="object-cover opacity-70"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[180px] rounded-full" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center min-h-[75vh]">
          <span className="mb-4 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Trusted by 15,000+ Job Seekers
          </span>

          <h1 className="max-w-5xl text-5xl md:text-7xl font-bold leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Dream Job
            </span>
            <br />
            Build Your Future
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Connect with top companies, discover opportunities,
            and take the next step in your career journey.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              color="primary"
              size="lg"
              radius="full"
            >
              Find Jobs
            </Button>

            <Button
              variant="bordered"
              size="lg"
              radius="full"
            >
              Hire Talent
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-6
                hover:border-violet-500/40
                transition-all
              "
            >
              <div className="mb-8 text-gray-300">
                {stat.icon}
              </div>

              <h3 className="text-4xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-2 text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}