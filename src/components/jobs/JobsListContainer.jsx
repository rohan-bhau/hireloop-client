"use client";

import React, { useState, useMemo } from 'react';
import JobFilters from './JobFilters';
import JobCard from './JobCard';

export default function JobsListContainer({ initialJobs }) {
  // Define global layout filters
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    remoteSetting: ''
  });

  // Calculate live matched arrays safely across keystrokes
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      // 1. Text Search Evaluation (Title, Company, or Requirements)
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = job.title?.toLowerCase().includes(query);
        const matchesCompany = job.companyName?.toLowerCase().includes(query);
        const matchesReqs = job.requirements?.toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesCompany && !matchesReqs) return false;
      }

      // 2. Job Type Match
      if (filters.type && job.type?.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }

      // 3. Category Match
      if (filters.category && job.category?.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // 4. Work Mode Match
      if (filters.remoteSetting) {
        if (filters.remoteSetting === 'remote' && !job.isRemote) return false;
        if (filters.remoteSetting === 'onsite' && job.isRemote) return false;
      }

      return true;
    });
  }, [filters, initialJobs]);

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-8">
      {/* Form Fields Component Layout */}
      <JobFilters filters={filters} setFilters={setFilters} />

      {/* FIXED: Professional, perfectly aligned results counter wrapper */}
      <div className="max-w-7xl w-full mb-6 flex items-center justify-start px-1">
        <div className="inline-flex items-center gap-2 bg-[#121212] border border-[#232323] px-3 py-1.5 rounded-full">
          {/* Active green radar pulse indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-400 text-xs font-medium tracking-wide">
            Found <span className="text-neutral-200 font-semibold">{filteredJobs.length}</span> matching position{filteredJobs.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Responsive Grid display output */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full justify-items-center">
          {filteredJobs.map((jobItem, idx) => (
            <JobCard 
              key={jobItem._id?.['$oid'] || jobItem._id || idx} 
              job={jobItem} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 max-w-7xl w-full border border-dashed border-neutral-800 rounded-2xl bg-[#121212]">
          <p className="text-neutral-500 text-base">No results match your selected filter criteria.</p>
        </div>
      )}
    </div>
  );
}