import { getCompanies } from '@/lib/api/companies';
import React from 'react';
import CompanyApprovalTable from './CompanyApprovalTable';

const AdminCompaniesPage = async () => {
    const companies = await getCompanies();

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto w-full">
        {/* Page Header Area */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Company Approvals Matrix</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Review submitted company profile details, industry categorizations, verification status, and perform vetting actions.
          </p>
        </div>

        {/* Client-side Table Element rendering */}
        <CompanyApprovalTable initialCompanies={companies} />
      </div>
    </div>
  );
};

export default AdminCompaniesPage;