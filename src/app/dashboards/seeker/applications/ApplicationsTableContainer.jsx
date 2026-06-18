"use client";

import React, { useState } from 'react';
import { Card, Button, Avatar, Table, Pagination, Chip } from '@heroui/react';
// Gravity UI Icons
import { Magnifier, Eye } from '@gravity-ui/icons';
// React Icons
import { LuFileSpreadsheet } from 'react-icons/lu';

const formatAppliedDate = (appliedAt) => {
  if (!appliedAt) return "N/A";
  
  const dateSource = appliedAt['$date'] ? appliedAt['$date'] : appliedAt;
  const parsedDate = new Date(dateSource);
  
  if (isNaN(parsedDate.getTime())) return "Recent";

  const now = new Date();
  const diffTime = Math.abs(now - parsedDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) return "Just now";
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return parsedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export default function ApplicationsTableContainer({ initialApplications = [] }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalApplied = initialApplications.length;
  const shortlistedCount = initialApplications.filter(app => app.status === 'shortlisted').length;
  const interviewCount = initialApplications.filter(app => app.status === 'interview' || app.status === 'offered').length;
  const successRate = totalApplied > 0 ? Math.round(((shortlistedCount + interviewCount) / totalApplied) * 100) : 0;

  const filteredApps = initialApplications.filter(app => {
    const matchesSearch = app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.companyName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'active') return matchesSearch && app.status !== 'rejected';
    if (filterStatus === 'archived') return matchesSearch && app.status === 'rejected';
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied': return 'warning';
      case 'shortlisted': return 'success';
      case 'rejected': return 'danger';
      case 'offered': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <>
      {/* SECTION 1: STATISTICS COUNTER CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-[#121212] border border-[#222224] p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-neutral-400 font-medium block mb-2">Total Applied</span>
          <h2 className="text-3xl font-black text-white tracking-tight">{totalApplied}</h2>
        </Card>

        <Card className="bg-[#121212] border border-[#222224] p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-neutral-400 font-medium block mb-2">Shortlisted</span>
          <h2 className="text-3xl font-black text-white tracking-tight">{shortlistedCount}</h2>
        </Card>

        <Card className="bg-[#121212] border border-[#222224] p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-neutral-400 font-medium block mb-2">Interviews</span>
          <h2 className="text-3xl font-black text-amber-400 tracking-tight">{interviewCount}</h2>
        </Card>

        <Card className="bg-[#121212] border border-[#222224] p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-neutral-400 font-medium block mb-2">Success Rate</span>
          <h2 className="text-3xl font-black text-emerald-400 tracking-tight">{successRate}%</h2>
        </Card>
      </div>

      {/* SECTION 2: CONTROLS */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="relative flex items-center max-w-md w-full bg-[#121212] border border-[#222224] rounded-xl focus-within:border-neutral-700 transition-colors">
          <Magnifier className="absolute left-3.5 text-neutral-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search applications..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-neutral-200 outline-none placeholder-neutral-600"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="bg-[#121212] border border-[#222224] p-1 rounded-xl flex items-center gap-1">
            {['all', 'active', 'archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setFilterStatus(tab); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filterStatus === tab ? 'bg-[#1e1e1f] text-white shadow' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Button 
            variant="flat" 
            size="sm"
            className="bg-[#ffffff] text-black font-bold h-9 rounded-xl px-4 flex items-center gap-2 hover:opacity-90"
          >
            <LuFileSpreadsheet className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* SECTION 3: DATA TABLE */}
      <div className="w-full bg-[#121212] text-white p-4 rounded-2xl border border-[#222224] shadow-2xl">
        <Table aria-label="Job Application Tracker Ledger">
          <Table.ResizableContainer>
            <Table.Content className="min-w-[800px] bg-transparent">
              
              <Table.Header>
                <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={220}>
                  Job Title <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="company" minWidth={160}>
                  Company <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="appliedDate" minWidth={150}>
                  Applied Date <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="status" minWidth={120}>
                  Status <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="0.8fr" id="actions" minWidth={100}>
                  Action <Table.ColumnResizer />
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {paginatedApps.length === 0 ? (
                  <Table.Row>
                    <Table.Cell className="text-center text-neutral-500 py-12">
                      No job applications matched your search criteria.
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                ) : (
                  paginatedApps.map((app) => {
                    const appId = app._id?.['$oid'] || app._id || `app-${app.jobId}`;
                    const fallbackChars = app.jobTitle ? app.jobTitle.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 'JB';

                    return (
                      <Table.Row key={appId} className="border-b border-neutral-900/60 hover:bg-white/[0.02] transition-colors">
                        <Table.Cell>
                          <div className="flex items-center gap-3 py-1">
                            <Avatar className="rounded-lg w-9 h-9 bg-[#1e1e1f] border border-neutral-800 flex items-center justify-center font-bold text-xs shrink-0 text-neutral-300 font-mono">
                              <Avatar.Image alt={app.companyName} src={app.companyLogo} />
                              <Avatar.Fallback>{fallbackChars}</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-neutral-200">{app.jobTitle}</span>
                              <span className="text-[11px] text-neutral-500 tracking-wide font-medium mt-0.5">Contract • Remote</span>
                            </div>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-neutral-400 font-medium">{app.companyName}</span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-neutral-300 font-medium">
                            {formatAppliedDate(app.appliedAt)}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <Chip 
                            color={getStatusColor(app.status)} 
                            size="sm" 
                            variant="soft"
                            className="capitalize font-semibold"
                          >
                            {app.status || "Pending"}
                          </Chip>
                        </Table.Cell>

                        <Table.Cell>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-neutral-400 hover:text-purple-400 min-w-8 w-8 h-8 rounded-lg"
                            aria-label="View Details"
                          >
                            <Eye className="size-4" />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                )}
              </Table.Body>

            </Table.Content>
          </Table.ResizableContainer>
        </Table>

        {totalPages > 1 && (
          <div className="p-4 border-t border-neutral-900 bg-transparent flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <Pagination.Summary className="text-xs text-neutral-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredApps.length)} of {filteredApps.length} results
            </Pagination.Summary>
            
            <Pagination className="justify-center">
              <Pagination.Content>
                {/* Previous Component Item */}
                <Pagination.Item>
                  <Pagination.Previous 
                    isDisabled={currentPage === 1} 
                    onPress={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={`text-neutral-400 rounded-lg border border-neutral-800/40 text-xs px-3 h-8 flex justify-end items-center gap-1 select-none transition-all ${
                      currentPage === 1 ? "opacity-40 bg-neutral-900/50 cursor-not-allowed" : "bg-[#161618] hover:bg-neutral-800 hover:text-white cursor-pointer"
                    }`}
                  >
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {/* Number Links Mapping */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Pagination.Item key={p}>
                    <Pagination.Link 
                      isActive={p === currentPage} 
                      onPress={() => setCurrentPage(p)}
                      className={`rounded-lg text-xs min-w-8 h-8 flex items-center justify-center font-semibold transition-all border cursor-pointer select-none ${
                        p === currentPage
                          ? "bg-purple-600 text-white font-bold border-purple-600 shadow-md"
                          : "bg-[#161618] text-neutral-400 border-neutral-800/40 hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}

                {/* Next Component Item */}
                <Pagination.Item>
                  <Pagination.Next 
                    isDisabled={currentPage === totalPages} 
                    onPress={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className={`text-neutral-400 rounded-lg border border-neutral-800/40 text-xs px-3 h-8 flex items-center gap-1 select-none transition-all ${
                      currentPage === totalPages ? "opacity-40 bg-neutral-900/50 cursor-not-allowed" : "bg-[#161618] hover:bg-neutral-800 hover:text-white cursor-pointer"
                    }`}
                  >
                    <span>Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}