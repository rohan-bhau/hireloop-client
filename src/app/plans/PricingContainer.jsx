"use client";

import React, { useState } from 'react';
import { Card, Button } from '@heroui/react';
// Gravity UI Icons
import { Rocket, ShieldCheck, Star } from '@gravity-ui/icons';
// React Icons
import { LuCheck, LuUsers, LuBriefcase, LuSparkles } from 'react-icons/lu';
import FramerAccordion from './FramerAccordion';

export default function PricingContainer() {
  const [audience, setAudience] = useState('seekers');

  const plansData = {
    seekers: [
      {
        name: "Free Tier",
        price: "$0",
        period: "forever",
        description: "Perfect for getting started and exploring available positions.",
        icon: <LuBriefcase className="w-5 h-5 text-neutral-400" />,
        features: ["Browse & save up to 10 jobs", "Apply to up to 3 jobs per month", "Basic job seeker profile", "Automated email alerts"],
        buttonText: "Get Started Free",
        highlighted: false
      },
      {
        name: "Pro Professional",
        price: "$19",
        period: "month",
        description: "Accelerate your path to landing your next destination.",
        icon: <Rocket className="w-5 h-5 text-purple-400" />,
        features: ["Apply up to 30 jobs per month", "Unlimited saved job opportunities", "Real-time application tracking status", "Exclusive workspace salary insights"],
        buttonText: "Upgrade to Pro",
        highlighted: true
      },
      {
        name: "Elite Premium",
        price: "$39",
        period: "month",
        description: "The ultimate tier for professional candidates matching elite positions.",
        icon: <Star className="w-5 h-5 text-amber-400" />,
        features: ["Everything included in Pro tier", "Unlimited global applications", "Profile boost optimization to recruiters", "Early access alerts to brand new listings", "Priority fast-track member support"],
        buttonText: "Go Elite Premium",
        highlighted: false
      }
    ],
    recruiters: [
      {
        name: "Free Baseline",
        price: "$0",
        period: "forever",
        description: "Ideal tracking baseline layout optimized for early startup hiring.",
        icon: <LuUsers className="w-5 h-5 text-neutral-400" />,
        features: ["Up to 3 active job postings", "Basic applicant management dashboard", "Standard public pipeline visibility", "Great for a company's first year"],
        buttonText: "Post Free Openings",
        highlighted: false
      },
      {
        name: "Growth Scale",
        price: "$49",
        period: "month",
        description: "Scale up your recruitment power with analytical tracking insights.",
        icon: <LuSparkles className="w-5 h-5 text-purple-400" />,
        features: ["Up to 10 active job postings", "Advanced candidate tracking suite", "Basic historical analytics dashboard", "Dedicated email response support"],
        buttonText: "Accelerate Growth",
        highlighted: true
      },
      {
        name: "Enterprise Global",
        price: "$149",
        period: "month",
        description: "Comprehensive tooling arrays custom-built for scaling operations.",
        icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
        features: ["Up to 50 active job postings", "Advanced analytics metrics pipeline", "Premium featured job highlights", "Multi-team collaboration workspaces", "Custom branding & priority support"],
        buttonText: "Contact Enterprise",
        highlighted: false
      }
    ]
  };

  return (
    <>
      {/* Toggle Switch */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#121212] border border-[#232323] p-1 rounded-xl inline-flex items-center gap-1">
          <button
            onClick={() => setAudience('seekers')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              audience === 'seekers' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white bg-transparent'
            }`}
          >
            For Job Seekers
          </button>
          <button
            onClick={() => setAudience('recruiters')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              audience === 'recruiters' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white bg-transparent'
            }`}
          >
            For Recruiters
          </button>
        </div>
      </div>

      {/* REWORKED: Modernized Pricing Cards System Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch max-w-6xl w-full">
        {plansData[audience].map((plan, idx) => (
          <Card
            key={idx}
            className={`flex flex-col justify-between rounded-3xl bg-[#111111] border p-0 transition-all duration-300 relative overflow-hidden group ${
              plan.highlighted 
                ? 'border-purple-500/80 shadow-[0_0_40px_-10px_rgba(168,85,247,0.15)] md:-translate-y-3' 
                : 'border-[#222222] hover:border-neutral-700 hover:-translate-y-1 shadow-xl'
            }`}
          >
            {/* Background Glow Layer for Highlighted Plan */}
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-500/10 blur-[50px] pointer-events-none" />
            )}

            {/* Top Info Header Container */}
            <div className="p-8 border-b border-[#1e1e1e] bg-[#141414]/50">
              <div className="flex justify-between items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-neutral-800 flex items-center justify-center shrink-0">
                  {plan.icon}
                </div>
                {plan.highlighted && (
                  <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full tracking-wider uppercase">
                    Most Popular
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-neutral-100 mb-4 tracking-tight">{plan.name}</h3>

              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">/ {plan.period}</span>
              </div>

              <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                {plan.description}
              </p>
            </div>

            {/* Bottom Features Checklist and Action Section */}
            <div className="p-8 flex-1 flex flex-col justify-between bg-[#111111]">
              <ul className="flex flex-col gap-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-neutral-300 font-normal">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <LuCheck className="w-2.5 h-2.5 text-emerald-400" />
                    </div>
                    <span className="text-neutral-300 group-hover:text-neutral-200 transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full font-bold rounded-xl text-xs py-5 transition-all duration-200 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/40 hover:opacity-95' 
                    : 'bg-[#1a1a1a] border border-[#262626] text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Framer Motion Accordion Display Section */}
      <FramerAccordion />
    </>
  );
}