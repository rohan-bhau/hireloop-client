import JobsListContainer from '@/components/jobs/JobsListContainer';
import { getJobs } from '@/lib/api/jobs'
import React from 'react'

const JobsPage = async () => {
    // Fetch raw jobs arrays safely from your database setup
    const rawJobs = await getJobs() || [];

    return (
      <div className="p-8 bg-[#0a0a0a] min-h-screen text-white flex flex-col items-center">
        {/* Visual Title Header */}
        <div className="text-center my-12">
          <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-semibold block mb-3">
            ▪ Smart Job Discovery ▪
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 tracking-tight">
            The roles you'd never<br />find by searching
          </h2>
        </div>

        {/* Dynamic client rendering system managed safely below */}
        <JobsListContainer initialJobs={rawJobs} />
      </div>
    )
}

export default JobsPage;