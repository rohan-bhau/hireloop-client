"use client";

import React, { useState } from "react";
import {
  Table,
  Avatar,
  Chip,
  Button,
  Pagination,
  Card,
  toast,
} from "@heroui/react";
import { updateCompany } from "@/lib/actions/company";
// Icons
import { Plus, Magnifier } from "@gravity-ui/icons";

export default function CompanyApprovalTable({ initialCompanies = [] }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [processingId, setProcessingId] = useState(null);

  // Search, Filter & Pagination States
  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const pendingReviewCount = companies.filter(
    (c) => c.status?.toLowerCase() === "pending",
  ).length;
  const approvedPartnersCount = companies.filter(
    (c) => c.status?.toLowerCase() === "approved",
  ).length;
  const totalRejectionsCount = companies.filter(
    (c) => c.status?.toLowerCase() === "rejected",
  ).length;

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.recruiterEmail
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      company.industry?.toLowerCase().includes(searchQuery.toLowerCase());

    if (currentTab === "all") return matchesSearch;
    return matchesSearch && company.status?.toLowerCase() === currentTab;
  });

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const dateSource = dateInput["$date"] ? dateInput["$date"] : dateInput;
    const parsedDate = new Date(dateSource);
    if (isNaN(parsedDate.getTime())) return "Oct 12, 2023";
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
            className="capitalize border-none bg-transparent text-emerald-400 font-semibold text-xs p-0"
          >
            Approved
          </Chip>
        );
      case "rejected":
        return (
          <Chip
            color="danger"
            variant="dot"
            className="capitalize border-none bg-transparent text-rose-400 font-semibold text-xs p-0"
          >
            Rejected
          </Chip>
        );
      default:
        return (
          <Chip
            color="warning"
            variant="dot"
            className="capitalize border-none bg-transparent text-amber-400 font-semibold text-xs p-0"
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
      if (
        result &&
        (result.modifiedCount > 0 || result.acknowledged === true)
      ) {
        setCompanies((prev) =>
          prev.map((c) =>
            (c._id?.["$oid"] || c._id) === id ? { ...c, status: newStatus } : c,
          ),
        );
        toast.success("Status Updated Successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* SECTION 1: ACTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Company Registrations
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Review and manage corporate entity access requests.
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus />}
          className="bg-white text-black hover:bg-zinc-200 font-bold rounded-xl h-10 px-4 text-xs self-start sm:self-auto"
        >
          Register New
        </Button>
      </div>

      {/* SECTION 2: METRICS COUNTER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-[#121212] border border-[#222224] p-5 rounded-2xl flex flex-col justify-between h-28">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold font-mono">
              Pending Review
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
              {pendingReviewCount}
            </h2>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold self-end">
            +12% vs last week
          </span>
        </Card>

        <Card className="bg-[#121212] border border-[#222224] p-5 rounded-2xl flex flex-col justify-between h-28">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold font-mono">
              Approved Partners
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
              {approvedPartnersCount}
            </h2>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold self-end">
            +5% vs last week
          </span>
        </Card>

        <Card className="bg-[#121212] border border-[#222224] p-5 rounded-2xl flex flex-col justify-between h-28 sm:col-span-2 lg:col-span-1">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold font-mono">
              Total Rejections
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
              {totalRejectionsCount}
            </h2>
          </div>
          <span className="text-[10px] text-zinc-500 font-bold self-end">
            Stable
          </span>
        </Card>
      </div>

      {/* SECTION 3: SEARCH BAR & TABS */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="relative flex items-center max-w-md w-full bg-[#121212] border border-[#222224] rounded-xl focus-within:border-neutral-700 transition-colors">
          <Magnifier className="absolute left-3.5 text-neutral-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, email, industry..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-neutral-200 outline-none placeholder-neutral-600"
          />
        </div>

        <div className="bg-[#121212] border border-[#222224] p-1 rounded-xl flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setCurrentTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all shrink-0 ${
                currentTab === tab
                  ? "bg-[#1e1e1f] text-white shadow"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 4: CORE TABLE WITH PROVIDED ANATOMY */}
      <div className="w-full bg-[#121212] text-white p-2 md:p-4 rounded-2xl border border-[#222224] shadow-2xl">
        <Table aria-label="Enterprise management matrix table">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60"
                >
                  Company Name
                </Table.Column>
                <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60">
                  Recruiter Email
                </Table.Column>
                <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60">
                  Industry
                </Table.Column>
                <Table.Column className="bg-[#161618] px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900/60">
                  Jobs Count
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
                {paginatedCompanies.length === 0 ? (
                  <Table.Row>
                    <Table.Cell className="text-center text-zinc-500 py-12 text-sm font-light">
                      No companies registered on logs.
                    </Table.Cell>
                    {[...Array(6)].map((_, i) => (
                      <Table.Cell key={i}></Table.Cell>
                    ))}
                  </Table.Row>
                ) : (
                  paginatedCompanies.map((company) => {
                    const companyId = company._id?.["$oid"] || company._id;
                    const fallbackChars = company.name
                      ? company.name.substring(0, 2).toUpperCase()
                      : "CO";
                    return (
                      <Table.Row
                        key={companyId}
                        className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors"
                      >
                        <Table.Cell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="rounded-lg">
                              <Avatar.Image
                                alt={company.name}
                                src={company.logoUrl || ""}
                              />
                                        <Avatar.Fallback className="w-9 h-9 rounded-xl bg-zinc-900 border border-neutral-800 text-xs font-bold shrink-0">{fallbackChars}</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-neutral-200">
                                {company.name}
                              </span>
                              <span className="text-[10px] text-zinc-500 mt-0.5">
                                {company.location || "Global"}
                              </span>
                            </div>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-neutral-400 font-medium">
                              {company.recruiterEmail || "Recruiter Desk"}
                            </span>
                            <span className="text-[10px] text-zinc-600 font-mono mt-0.5">
                              {company.recruiterId || "No Link"}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="px-6 py-4">
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-zinc-900/80 text-zinc-400 font-medium capitalize border border-neutral-800/40 text-[11px]"
                          >
                            {company.industry || "General"}
                          </Chip>
                        </Table.Cell>

                        <Table.Cell className="px-6 py-4">
                          <span className="text-sm text-neutral-300 font-semibold pl-4">
                            {company.jobCount || 0}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="px-6 py-4">
                          {getStatusChip(company.status)}
                        </Table.Cell>

                        <Table.Cell className="px-6 py-4">
                          <span className="text-sm text-neutral-400 font-mono font-light">
                            {formatDate(company.createdAt)}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
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
                              className={`font-bold rounded-xl px-4 text-xs h-8 ${company.status === "approved" ? "opacity-30 cursor-not-allowed bg-transparent text-neutral-600" : "bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20"}`}
                            >
                              Approve
                            </Button>
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
                              className={`font-bold rounded-xl px-4 text-xs h-8 ${company.status === "rejected" ? "opacity-30 cursor-not-allowed bg-transparent text-neutral-600" : "bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20"}`}
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

        {/* SECTION 5: RESPONSIVE PAGINATION BAR */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-neutral-900 bg-transparent flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <Pagination.Summary className="text-xs text-neutral-500 text-center md:text-left">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredCompanies.length)}{" "}
              of {filteredCompanies.length} results
            </Pagination.Summary>

            <Pagination className="justify-center max-w-full">
              <Pagination.Content className="flex items-center gap-1 flex-wrap justify-center">
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={currentPage === 1}
                    onPress={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={`text-neutral-400 rounded-lg border border-neutral-800/40 text-[11px] sm:text-xs px-2.5 sm:px-3 h-8 flex items-center gap-1 select-none transition-all ${
                      currentPage === 1
                        ? "opacity-40 bg-neutral-900/50 cursor-not-allowed"
                        : "bg-[#161618] hover:bg-neutral-800 hover:text-white cursor-pointer"
                    }`}
                  >
                    <Pagination.PreviousIcon className="w-3 h-3 shrink-0" />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === currentPage}
                        onPress={() => setCurrentPage(p)}
                        className={`rounded-lg text-xs min-w-8 max-w-8 h-8 flex items-center justify-center font-semibold transition-all border cursor-pointer select-none ${
                          p === currentPage
                            ? "bg-purple-600 text-white font-bold border-purple-600 shadow-md"
                            : "bg-[#161618] text-neutral-400 border-neutral-800/40 hover:bg-neutral-800 hover:text-white"
                        }`}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={currentPage === totalPages}
                    onPress={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className={`text-neutral-400 rounded-lg border border-neutral-800/40 text-[11px] sm:text-xs px-2.5 sm:px-3 h-8 flex items-center gap-1 select-none transition-all ${
                      currentPage === totalPages
                        ? "opacity-40 bg-neutral-900/50 cursor-not-allowed"
                        : "bg-[#161618] hover:bg-neutral-800 hover:text-white cursor-pointer"
                    }`}
                  >
                    <span>Next</span>
                    <Pagination.NextIcon className="w-3 h-3 shrink-0" />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
