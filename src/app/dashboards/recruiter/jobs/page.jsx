import React from 'react';
import JobsTable from '@/components/dashboards/JobsTable';
import { getCompanyJobs } from '@/lib/actions/api/jobs';

const RecruiterJobs = async () => {
  const companyId = 'comp_67890'; 
  
  // Fetching data safely on the server side
  const jobs = await getCompanyJobs(companyId) || []; 
  
  // Parsing MongoDB custom data structures to clean JSON arrays
  const plainJobsArray = JSON.parse(JSON.stringify(jobs));

  return (
    <div className="p-6">
      <JobsTable jobs={plainJobsArray} />
    </div>
  );
};

export default RecruiterJobs;