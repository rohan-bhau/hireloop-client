"use client";

import React, { useState } from 'react';
import { Card, Button, Avatar, Table, Pagination, Chip } from '@heroui/react';
// Gravity UI Icons
import { Magnifier, Eye } from '@gravity-ui/icons';
// React Icons
import { LuFileSpreadsheet } from 'react-icons/lu';

export default function ApplicationsTableContainer({ initialApplications = [] }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // dashboard static cards
  const totalApplied = initialApplications.length;
  const shortlistedCount = initialApplications.filter(app => app.status === 'shortlisted').length;
  const interviewCount = initialApplications.filter(app => app.status === 'interview' || app.status === 'offered').length;
  const successRate = totalApplied > 0 ? Math.round(((shortlistedCount + interviewCount) / totalApplied) * 100) : 0;

  // search and filtering
  const filteredApps = initialApplications.filter(app => {
    const matchesSearch = app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.companyName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'active') return matchesSearch && app.status !== 'rejected';
    if (filterStatus === 'archived') return matchesSearch && app.status === 'rejected';
    return matchesSearch;
  });

  // pagination slice range
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // status badge color 
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'warning';
      case 'shortlisted': return 'success';
      case 'rejected': return 'danger';
      case 'offered': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <>
      {/* SECTION 1: STATISTICS CARDS */}
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

      {/* SECTION 2: SEARCH FILTER AND CONTROLS */}
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

      {/* SECTION 3: CORE DATA TABLE WITH EXACT V3 DOT NOTATION */}
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
                <Table.Column defaultWidth="1fr" id="appliedDate" minWidth={140}>
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
                    const appliedDate = app.appliedAt?.['$date'] 
                      ? new Date(app.appliedAt['$date']).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) 
                      : 'Recent';
                    const appId = app._id?.['$oid'] || app._id || `app-${app.jobId}`;

                    return (
                      <Table.Row key={appId} className="border-b border-neutral-900/60 hover:bg-white/[0.02] transition-colors">
                        
                        {/* Job Title & Metadata */}
                        <Table.Cell>
                          <div className="flex items-center gap-3 py-1">
                            <Avatar color="default" className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-xs shrink-0">
                              <Avatar.Fallback>{app.jobTitle ? app.jobTitle.substring(0, 2).toUpperCase() : 'JB'}</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-neutral-200">{app.jobTitle}</span>
                              <span className="text-[11px] text-neutral-500 tracking-wide font-medium mt-0.5">Contract • Remote</span>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Company Identity */}
                        <Table.Cell>
                          <span className="text-sm text-neutral-400 font-medium">{app.companyName}</span>
                        </Table.Cell>

                        {/* Normalized Applied Date String */}
                        <Table.Cell>
                          <span className="text-xs text-neutral-400 font-light font-mono">{appliedDate}</span>
                        </Table.Cell>

                        {/* Status Badges Matching JobsTable Structure */}
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

                        {/* Interactive Metrics Details Anchor */}
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

        {/* SECTION 4: TABLE PAGination FOOTER */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-neutral-900 bg-transparent flex justify-center mt-4">
            <Pagination 
              total={totalPages} 
              page={currentPage} 
              onChange={setCurrentPage}
              color="secondary"
              size="sm"
              classNames={{
                wrapper: "gap-1",
                item: "bg-[#161618] text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white border border-neutral-800/40 text-xs min-w-8 h-8",
                cursor: "bg-purple-600 text-white rounded-lg font-bold text-xs min-w-8 h-8 shadow-md"
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}