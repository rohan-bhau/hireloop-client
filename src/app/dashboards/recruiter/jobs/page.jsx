import React from 'react';
import JobsTable from '@/components/dashboards/JobsTable';
import { getCompanyJobs } from '@/lib/api/jobs';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany()
  const companyId = company._id; 
  
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