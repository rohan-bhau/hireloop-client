"use client";

import React from 'react';
import { Chip, Table, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin, Plus } from "@gravity-ui/icons";
import Link from 'next/link';

export default function JobsTable({ jobs = [] }) {
  return (
    <div className="w-full bg-[#020617] text-white p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
      
      {/* Table Header Controls */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Published Roles</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Monitor application deadlines, salaries, statuses, and tracking variables across active openings.
          </p>
              </div>
              <Link  href="/dashboards/recruiter/jobs/new">
              <Button
                
                  color="primary"
                  className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-white rounded-xl h-10 px-4"
                  startContent={<Plus />}
        >
          Post a Job
        </Button>
              </Link>

      </div>

      {/* Hero UI v3 Resizable Column Table */}
      <Table aria-label="Company jobs management matrix">
        <Table.ResizableContainer>
          <Table.Content className="min-w-[800px] bg-[#0f172a]/40 border border-white/5 rounded-xl">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={200}>
                Job Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
                Type & Work Mode
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="salary" minWidth={160}>
                Compensation Matrix
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
                Deadline
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="0.8fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="actions" minWidth={140}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs.length === 0 ? (
                <Table.Row>
                  <Table.Cell className="text-center text-zinc-500 py-8">No jobs posted yet.</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              ) : (
                jobs.map((job) => (
                  <Table.Row key={job._id?.toString() || job.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    
                    {/* Job Title & Category */}
                    <Table.Cell>
                      <div className="flex flex-col gap-0.5 py-1">
                        <span className="font-semibold text-zinc-100 text-sm">{job.title}</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono font-bold">
                          {job.category}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Job Assignment Type & Remote Marker */}
                    <Table.Cell>
                      <div className="flex flex-col gap-1 items-start">
                        <span className="text-xs font-medium bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full capitalize">
                          {job.type}
                        </span>
                        <span className={`text-[10px] uppercase tracking-widest font-bold ${job.isRemote ? "text-teal-400" : "text-amber-400"}`}>
                          {job.isRemote ? "🌐 Remote Work" : "🏢 On-Site"}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Salary Package */}
                    <Table.Cell>
                      <span className="text-sm font-medium text-zinc-200">
                        {job.currency} {Number(job.salaryMin).toLocaleString()} - {Number(job.salaryMax).toLocaleString()}
                      </span>
                    </Table.Cell>

                    {/* Application Deadline */}
                    <Table.Cell>
                      <span className="text-sm text-zinc-300 font-mono">
                        {job.deadline}
                      </span>
                    </Table.Cell>

                    {/* Status Variant Badge */}
                    <Table.Cell>
                      <Chip 
                        color={job.status === "active" ? "success" : "danger"} 
                        size="sm" 
                        variant="soft"
                        className="capitalize font-semibold"
                      >
                        {job.status || "Inactive"}
                      </Chip>
                    </Table.Cell>

                    {/* Action Buttons */}
                    <Table.Cell>
                      <div className="flex items-center gap-1">
                        {/* View Details */}
                        <Button
                          as={Link}
                          href={`/jobs/${job._id?.toString() || job.id}`}
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-indigo-400 min-w-8 w-8 h-8 rounded-lg"
                          aria-label="View Details"
                        >
                          <Eye className="size-4" />
                        </Button>

                        {/* Edit Opportunity */}
                        <Button
                          as={Link}
                          href={`/dashboard/recruiter/jobs/edit/${job._id?.toString() || job.id}`}
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-amber-400 min-w-8 w-8 h-8 rounded-lg"
                          aria-label="Edit Job"
                        >
                          <Pencil className="size-4" />
                        </Button>

                        {/* Delete Opportunity */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-red-400 min-w-8 w-8 h-8 rounded-lg"
                          aria-label="Delete Job"
                        >
                          <TrashBin className="size-4" />
                        </Button>
                      </div>
                    </Table.Cell>

                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
}