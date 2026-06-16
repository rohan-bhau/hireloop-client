"use client";

import React, { useEffect, useState } from 'react';
import { Card, Chip } from '@heroui/react';
// Gravity UI Icons
import { Briefcase, ArrowUpRight } from '@gravity-ui/icons';
// React Icons
import { LuCircleDollarSign, LuMapPin } from 'react-icons/lu';
import Link from 'next/link';

export default function JobCard({ job }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!job) return null;

    const {
      _id,
    title,
    companyName,
    companyLogo,
    location,
    type,
    isRemote,
    salaryMin,
    salaryMax,
    currency,
    description,
    companyWebsite
  } = job;

  const formatSalary = (val) => (val ? `${val / 1000}k` : '');
  const currencySymbol = currency === 'USD' ? '$' : currency;
  const salaryDisplay = `${currencySymbol}${formatSalary(salaryMin)}–${formatSalary(salaryMax)}/year`;

  if (!mounted) {
    return <div className="w-full max-w-[380px] h-[320px] bg-[#121212] border border-[#232323] rounded-2xl animate-pulse" />;
  }

  return (
    <Card 
      className="w-full max-w-[380px] bg-[#121212] border border-[#232323] text-white p-6 rounded-2xl shadow-xl hover:border-neutral-700 transition-all duration-300"
    >
      <Card.Header className="flex flex-col items-start gap-4 p-0 pb-3">
        {/* Company Identity with fixed native image rendering */}
        <div className="flex items-center gap-3">
          {companyLogo ? (
            <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
              <img 
                src={companyLogo} 
                alt={companyName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if the image URL fails to load entirely
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] text-neutral-400 font-bold shrink-0">
              {companyName?.charAt(0)}
            </div>
          )}
          <span className="text-xs text-neutral-400 font-medium tracking-wide uppercase">
            {companyName}
          </span>
        </div>

        <h3 className="text-2xl font-semibold text-neutral-100 tracking-tight leading-snug">
          {title}
        </h3>
      </Card.Header>

      <Card.Content className="p-0 py-2 flex flex-col gap-6">
        <p className="text-sm text-neutral-400 font-light leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Chip
            className="bg-[#1e1e1e] text-neutral-300 border border-neutral-800 text-xs px-2.5 py-1 h-auto rounded-full"
            variant="bordered"
          >
            <div className="flex items-center gap-1.5">
              <LuMapPin size={13} className="text-purple-400 shrink-0" />
              <span>{location}</span>
            </div>
          </Chip>

          <Chip
            className="bg-[#1e1e1e] text-neutral-300 border border-neutral-800 text-xs px-2.5 py-1 h-auto rounded-full capitalize"
            variant="bordered"
          >
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{type}</span>
            </div>
          </Chip>

          <Chip
            className="bg-[#1e1e1e] text-neutral-300 border border-neutral-800 text-xs px-2.5 py-1 h-auto rounded-full"
            variant="bordered"
          >
            <div className="flex items-center gap-1.5">
              <LuCircleDollarSign size={13} className="text-purple-400 shrink-0" />
              <span>{salaryDisplay}</span>
            </div>
          </Chip>
        </div>
      </Card.Content>

      <Card.Footer className="p-0 pt-6 flex justify-between items-center">
              <Link
                  href={`/jobs/${_id}`}
          className="group inline-flex items-center gap-2 text-sm text-white hover:text-neutral-300 font-medium transition-colors cursor-pointer"
        >
          Apply Now
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
        
        {isRemote && (
          <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded-md font-mono tracking-wider uppercase">
            Remote Eligible
          </span>
        )}
      </Card.Footer>
    </Card>
  );
}