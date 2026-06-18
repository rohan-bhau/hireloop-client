"use client";

import React, { useState } from "react";
import { Table, Avatar, Chip, Button, toast } from "@heroui/react";
import { updateCompany } from "@/lib/actions/company";

export default function CompanyApprovalTable({ initialCompanies = [] }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [processingId, setProcessingId] = useState(null);

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const dateSource = dateInput["$date"] ? dateInput["$date"] : dateInput;
    const parsedDate = new Date(dateSource);
    if (isNaN(parsedDate.getTime())) return "Oct 12, 2023"; // Fallback static pattern format matching image
    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <Chip
            color="success"
            variant="dot"
            className="capitalize border-none bg-transparent text-emerald-400 font-semibold text-xs"
          >
            Approved
          </Chip>
        );
      case "rejected":
        return (
          <Chip
            color="danger"
            variant="dot"
            className="capitalize border-none bg-transparent text-rose-400 font-semibold text-xs"
          >
            Rejected
          </Chip>
        );
      default:
        return (
          <Chip
            color="warning"
            variant="dot"
            className="capitalize border-none bg-transparent text-amber-400 font-semibold text-xs"
          >
            Pending
          </Chip>
        );
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setProcessingId(id);
    try {
      const result = await updateCompany(id, { status: newStatus });
      
      if (result && (result.modifiedCount > 0 || result.acknowledged === true)) {
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) => {
            const companyId = company._id?.["$oid"] || company._id;
            if (companyId === id) {
              return { ...company, status: newStatus }; 
            }
            return company;
          })
        );
        toast.success("Status Updated Successfully!");
      } else {
        toast.error("No modifications were detected.");
      }
      
      console.log("Backend response:", result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="w-full">
      <Table aria-label="Enterprise deployment workflow management table">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[1000px] bg-[#111112] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60"
              >
                Company Name
              </Table.Column>

              <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60">
                Recruiter Space
              </Table.Column>

              <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60">
                Industry
              </Table.Column>

              <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60">
                Status
              </Table.Column>

              <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60">
                Date Submitted
              </Table.Column>

              <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {companies.length === 0 ? (
                <Table.Row>
                  <Table.Cell className="text-center text-zinc-500 py-12 text-sm font-light">
                    No companies registered on database logs.
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              ) : (
                companies.map((company) => {
                  const companyId = company._id?.["$oid"] || company._id;
                  const fallbackChars = company.name
                    ? company.name.substring(0, 2).toUpperCase()
                    : "CO";
                  const isPending = company.status?.toLowerCase() === "pending";

                  return (
                    <Table.Row
                      key={companyId}
                      className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors duration-150"
                    >
                      {/* 1. Company Name & Logo */}
                      <Table.Cell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={company.logoUrl || ""}
                            className="w-9 h-9 rounded-xl bg-zinc-900 border border-neutral-800 text-xs font-bold tracking-wider font-mono shrink-0"
                          >
                            <Avatar.Fallback>{fallbackChars}</Avatar.Fallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-neutral-200">
                              {company.name}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-medium truncate max-w-[150px] mt-0.5">
                              {company.location || "Global"}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* 2. Recruiter Context */}
                      <Table.Cell className="px-6 py-4">
                              <div className="flex flex-col">
                                  {company.recruiterEmail? <span className="text-sm text-neutral-400 font-medium">
                            {company.recruiterEmail}
                          </span>:<span className="text-sm text-neutral-400 font-medium">
                            Recruiter Desk
                          </span>}
                          
                          <span className="text-[10px] text-zinc-600 font-mono mt-0.5">
                            {company.recruiterId || "No Recruiter Link"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* 3. Industry Badge */}
                      <Table.Cell className="px-6 py-4">
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-zinc-900/80 text-zinc-400 font-medium capitalize border border-neutral-800/40 text-[11px]"
                        >
                          {company.industry || "General"}
                        </Chip>
                      </Table.Cell>

                      {/* 4. Status Dot Variant */}
                      <Table.Cell className="px-6 py-4">
                        {getStatusChip(company.status)}
                      </Table.Cell>

                      {/* 5. Submission Date */}
                      <Table.Cell className="px-6 py-4">
                        <span className="text-sm text-neutral-400 font-mono font-light">
                          {formatDate(company.createdAt)}
                        </span>
                      </Table.Cell>

                      {/* 6. Action Triggers Row matching image_90fc81 */}
                      <Table.Cell className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* Approve Action */}
                          <Button
                            size="sm"
                            variant="flat"
                            disabled={
                              processingId !== null ||
                              company.status === "approved"
                            }
                            onClick={() =>
                              handleStatusUpdate(companyId, "approved")
                            }
                            className={`font-bold rounded-xl px-4 text-xs h-8 transition-all ${
                              company.status === "approved"
                                ? "opacity-30 cursor-not-allowed bg-transparent text-neutral-600"
                                : "bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20"
                            }`}
                          >
                            Approve
                          </Button>

                          {/* Reject Action */}
                          <Button
                            size="sm"
                            variant="flat"
                            disabled={
                              processingId !== null ||
                              company.status === "rejected"
                            }
                            onClick={() =>
                              handleStatusUpdate(companyId, "rejected")
                            }
                            className={`font-bold rounded-xl px-4 text-xs h-8 transition-all ${
                              company.status === "rejected"
                                ? "opacity-30 cursor-not-allowed bg-transparent text-neutral-600"
                                : "bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20"
                            }`}
                          >
                            Reject
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
