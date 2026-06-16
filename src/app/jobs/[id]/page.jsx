import { getJobsById } from '@/lib/api/jobs';
import React from 'react';
import { Chip, Button } from '@heroui/react';
// Gravity UI Icons
import { Briefcase, Calendar, ArrowLeft } from '@gravity-ui/icons';
// React Icons
import { LuCircleDollarSign, LuMapPin, LuExternalLink  } from 'react-icons/lu';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobsById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <p className="text-neutral-500 mb-4">Job details could not be found.</p>
        <Link href="/jobs" className="text-purple-400 flex items-center gap-2 text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </Link>
      </div>
    );
  }

  const {
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
    responsibilities,
    requirements,
    benefits,
    deadline,
    companyWebsite
  } = job;

  // Format details cleanly
  const formatSalary = (val) => (val ? `${val / 1000}k` : '');
  const currencySymbol = currency === 'USD' ? '$' : currency;
  const salaryDisplay = `${currencySymbol}${formatSalary(salaryMin)}–${formatSalary(salaryMax)} / year`;
  
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Back Link Nav */}
        <Link 
          href="/jobs" 
          className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Career Opportunities
        </Link>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT PANEL: Core Main Content (Takes 2 blocks on desktop columns) */}
          <div className="lg:col-span-2 flex flex-col gap-8 bg-[#121212] border border-[#232323] p-6 md:p-8 rounded-2xl">
            
            {/* Main Header Information */}
            <div className="border-b border-neutral-800 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex gap-4 items-center">
                {companyLogo ? (
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                    <img src={companyLogo} alt={companyName} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-lg font-bold shrink-0 text-neutral-400">
                    {companyName?.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-100">{title}</h1>
                  <p className="text-neutral-400 font-medium mt-0.5 flex items-center gap-2">
                    {companyName}
                    <a href={companyWebsite} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-purple-400 transition-colors">
                      <LuExternalLink size={14} />
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Chip className="bg-[#1e1e1e] text-neutral-300 border border-neutral-800 text-xs px-2.5 py-1" variant="bordered">
                  <span className="capitalize">{type}</span>
                </Chip>
                {isRemote && (
                  <Chip className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 text-xs px-2.5 py-1" variant="bordered">
                    Remote
                  </Chip>
                )}
              </div>
            </div>

            {/* Description Segment */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-200 mb-2.5">About the Position</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">{description}</p>
            </div>

            {/* Responsibilities Segment */}
            {responsibilities && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-3">Key Responsibilities</h3>
                <div className="flex gap-3 items-start text-sm text-neutral-400 leading-relaxed font-light">
                  <FiCheckCircle  size={16} className="text-purple-400 mt-1 shrink-0" />
                  <p>{responsibilities}</p>
                </div>
              </div>
            )}

            {/* Requirements Segment */}
            {requirements && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-3">Skills & Requirements</h3>
                <div className="flex gap-3 items-start text-sm text-neutral-400 leading-relaxed font-light">
                  <FiCheckCircle  size={16} className="text-purple-400 mt-1 shrink-0" />
                  <p>{requirements}</p>
                </div>
              </div>
            )}

            {/* Benefits Segment */}
            {benefits && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-3">Perks & Benefits</h3>
                <div className="flex gap-3 items-start text-sm text-neutral-400 leading-relaxed font-light">
                  <FiCheckCircle  size={16} className="text-purple-400 mt-1 shrink-0" />
                  <p>{benefits}</p>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT PANEL: Quick Metrics & Actions Sidebar Panel */}
          <div className="lg:col-span-1 flex flex-col gap-6 bg-[#121212] border border-[#232323] p-6 rounded-2xl lg:sticky lg:top-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 pb-2 border-b border-neutral-800">
              Job Summary
            </h3>

            <div className="flex flex-col gap-4">
              {/* Location Metric */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1e1e1e] border border-neutral-800 flex items-center justify-center shrink-0">
                  <LuMapPin size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase font-medium">Location</p>
                  <p className="text-sm text-neutral-300 font-medium">{location}</p>
                </div>
              </div>

              {/* Salary Metric */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1e1e1e] border border-neutral-800 flex items-center justify-center shrink-0">
                  <LuCircleDollarSign size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase font-medium">Comp Range</p>
                  <p className="text-sm text-neutral-200 font-semibold">{salaryDisplay}</p>
                </div>
              </div>

              {/* Employment Type Metric */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1e1e1e] border border-neutral-800 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase font-medium">Contract Basis</p>
                  <p className="text-sm text-neutral-300 font-medium capitalize">{type}</p>
                </div>
              </div>

              {/* Deadline Metric */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1e1e1e] border border-neutral-800 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase font-medium">Application Deadline</p>
                  <p className="text-sm text-rose-400 font-medium">{formattedDeadline}</p>
                </div>
              </div>
            </div>

            <hr className="border-neutral-800 my-1" />

            {/* Main Action Call to Button */}
            <Button
              as="a"
              href={companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              className="w-full font-semibold py-6 text-sm shadow-lg rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
            >
              Apply For This Position
            </Button>
            
            <p className="text-[11px] text-neutral-500 text-center font-light leading-snug">
              By clicking apply, you will be redirected to {companyName}'s job tracking system website safely.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetailPage;