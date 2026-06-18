import { getCompanies } from '@/lib/api/companies';
import React from 'react';
import CompanyApprovalTable from './CompanyApprovalTable';

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto w-full">
        {/* Render Client-side Table and Statistics Layout */}
        <CompanyApprovalTable initialCompanies={companies} />
      </div>
    </div>
  );
};

export default AdminCompaniesPage;