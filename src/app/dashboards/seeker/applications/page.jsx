import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { redirect } from 'next/navigation';
import ApplicationsTableContainer from './ApplicationsTableContainer';

const ApplicationsPage = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect('/auth/signin?redirect=/dashboards/seeker/applications');
  }

  const applications = await getApplicationsByApplicant(user.id);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-neutral-100 tracking-tight">My Applications</h1>
          <p className="text-sm text-neutral-400 mt-2 font-light">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        {/* Client-side Table & Statistics Component rendering */}
        <ApplicationsTableContainer initialApplications={applications} />

      </div>
    </div>
  );
};

export default ApplicationsPage;