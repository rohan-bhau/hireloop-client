"use client";

import {
  Magnifier,
  ChartColumn,
 Factory,
  Bookmark,
  Sparkles,
  FileText,
  ArrowUpRight,
} from "@gravity-ui/icons";
import { FiHexagon } from "react-icons/fi";


const features = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Magnifier,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: ChartColumn,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: Factory,
  },
  {
    title: "Saved Jobs",
    description: "Manage applications & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: Sparkles,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileText,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: FiHexagon ,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: ArrowUpRight,
  },
];

export default function FeaturedJobsSection() {
  return (
    <section suppressHydrationWarning className="relative py-24 lg:py-32 bg-[#07070B] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 text-zinc-400 uppercase tracking-widest text-sm">
            <span className="w-2 h-2 bg-violet-500"></span>
            Features Job
            <span className="w-2 h-2 bg-violet-500"></span>
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12 gap-x-10">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-start gap-5 group"
              >
                {/* Icon Box */}
                <div
                  className="
                    flex-shrink-0
                    w-16 h-16
                    rounded-xl
                    border border-white/10
                    bg-gradient-to-b
                    from-white/[0.05]
                    to-transparent
                    backdrop-blur-xl
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:border-violet-500/40
                    group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]
                  "
                >
                  <Icon
                    className="
                      w-7 h-7
                      text-violet-300
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-white text-xl font-medium mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}