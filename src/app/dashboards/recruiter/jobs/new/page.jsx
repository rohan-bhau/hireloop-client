"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Form, 
  Fieldset, 
  Input, 
  TextArea, 
  Select, 
  ListBox,
  Button, 
  Switch,
  Label,
  Description
} from "@heroui/react";
// Icons
import { Briefcase, Calendar, Layers, ChevronDown } from "@gravity-ui/icons";
import { TbMoneybag } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";

export default function NewJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRemote, setIsRemote] = useState(false);

  // Simulated approved company data
  const companyInfo = {
    id: "comp_67890",
    name: "HireLoop Labs Ltd.",
    status: "approved"
  };

  const jobTypes = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "internship", label: "Internship" }
  ];

  const categories = [
    { id: "technology", label: "Technology & Engineering" },
    { id: "design", label: "Design & Creative" },
    { id: "marketing", label: "Marketing & Growth" },
    { id: "finance", label: "Finance & Accounting" },
    { id: "management", label: "Business Management" }
  ];

  const currencies = [
    { id: "USD", label: "USD ($)" },
    { id: "BDT", label: "BDT (৳)" },
    { id: "EUR", label: "EUR (€)" },
    { id: "GBP", label: "GBP (£)" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (companyInfo.status !== "approved") {
      setError("Your company profile must be approved before publishing job openings.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const completeJobPayload = {
      ...data,
      isRemote,
      companyId: companyInfo.id,
      companyName: companyInfo.name,
      status: "active",
      createdAt: new Date().toISOString()
    };

    try {
      console.log("Submitting Payload to MongoDB:", completeJobPayload);
      setSuccess("Job listing published successfully! Redirecting...");
    //   setTimeout(() => {
    //     router.push("/dashboard/recruiter/jobs");
    //   }, 1500);
    } catch (err) {
      setError("An unexpected database connection error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 text-white bg-[#020617] min-h-screen">
      
      {/* Page Header */}
      <div className="mb-10 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Post a New Position
        </h1>
        <p className="text-sm text-zinc-400">
          Fill out the fields below to publish and broadcast your position across our network.
        </p>
      </div>

      {/* Messaging States */}
      {error && (
        <div className="mb-6 rounded-xl bg-danger-500/10 border border-danger-500/20 p-4 text-sm text-danger-400 backdrop-blur-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-400 backdrop-blur-sm">
          {success}
        </div>
      )}

      <Form onSubmit={handleSubmit}  className="flex flex-col gap-10">
        
        {/* SECTION 1: Job Info Card */}
        <Fieldset className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 w-full backdrop-blur-md shadow-2xl">
          <legend className="text-xl font-bold text-indigo-400 tracking-wide mb-2 px-1">
            Job Details & Parameters
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Job Title</label>
              <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                <Briefcase className="text-zinc-500 text-lg flex-shrink-0" />
                <Input
                  name="title"
                  placeholder="e.g. Senior Software Engineer"
                  required
                  className="w-full text-white bg-transparent outline-none border-none focus:ring-0 text-sm"
                />
              </div>
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Application Deadline</label>
              <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                <Calendar className="text-zinc-500 text-lg flex-shrink-0" />
                <Input
                  name="deadline"
                  type="date"
                  required
                  className="w-full text-zinc-300 bg-transparent outline-none border-none focus:ring-0 text-sm"
                />
              </div>
            </div>

            {/* Job Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Job Category</label>
              <Select 
                name="category" 
                placeholder="Select category" 
                className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl transition-all"
              >
                <Select.Trigger className="h-12 border-none px-4">
                  <Select.Value className="text-zinc-300 text-sm" />
                  <Select.Indicator><ChevronDown className="text-zinc-400" /></Select.Indicator>
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0f172a] text-white border border-white/10 rounded-xl p-1 shadow-2xl">
                    {categories.map((cat) => (
                      <ListBox.Item key={cat.id} id={cat.id} textValue={cat.label} className="hover:bg-indigo-600 rounded-lg p-2.5 transition-colors text-sm">
                        {cat.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Job Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Job Type</label>
              <Select 
                name="type" 
                placeholder="Select type" 
                className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl transition-all"
              >
                <Select.Trigger className="h-12 border-none px-4">
                  <Select.Value className="text-zinc-300 text-sm" />
                  <Select.Indicator><ChevronDown className="text-zinc-400" /></Select.Indicator>
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0f172a] text-white border border-white/10 rounded-xl p-1 shadow-2xl">
                    {jobTypes.map((type) => (
                      <ListBox.Item key={type.id} id={type.id} textValue={type.label} className="hover:bg-indigo-600 rounded-lg p-2.5 transition-colors text-sm">
                        {type.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>

          {/* Location Panel - Using HeroUI v3 Compound Switch Components */}
          <div className="p-5 rounded-xl bg-zinc-950/40 border border-white/10 flex flex-col gap-4 w-full mt-2">
            <Switch isSelected={isRemote} onChange={setIsRemote}>
              <Switch.Control className="h-[26px] w-[46px] bg-zinc-700 data-[selected=true]:bg-indigo-600 rounded-full p-0.5 transition-colors duration-200 cursor-pointer">
                <Switch.Thumb className="h-[22px] w-[22px] bg-white rounded-full block transform transition-transform duration-200 data-[selected=true]:translate-x-5" />
              </Switch.Control>
              <Switch.Content className="flex flex-col ml-3">
                <Label className="text-sm font-semibold text-zinc-200">Remote Position</Label>
                <Description className="text-xs text-zinc-500">Enable if candidates can work entirely from home.</Description>
              </Switch.Content>
            </Switch>

            {!isRemote && (
              <div className="flex flex-col gap-2 mt-2 w-full animate-fade-in">
                <label className="text-sm font-semibold text-zinc-300">Office Location</label>
                <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                  <GrLocation className="text-zinc-500 text-lg flex-shrink-0" />
                  <Input
                    name="location"
                    placeholder="City, Country (e.g. Dhaka, Bangladesh)"
                    required={!isRemote}
                    className="w-full text-white bg-transparent outline-none border-none focus:ring-0 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Compensation Matrix Layout */}
          <div className="p-5 rounded-xl bg-zinc-950/40 border border-white/10 w-full flex flex-col gap-4 mt-2">
            <span className="text-sm font-semibold text-zinc-200">Compensation Package</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
              
              {/* Currency Select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400">Currency</label>
                <Select 
                  name="currency" 
                  placeholder="Currency" 
                  className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl transition-all"
                  defaultValue="USD"
                >
                  <Select.Trigger className="h-12 border-none px-4">
                    <Select.Value className="text-zinc-300 text-sm" />
                    <Select.Indicator><ChevronDown className="text-zinc-400" /></Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#0f172a] text-white border border-white/10 rounded-xl p-1 shadow-2xl">
                      {currencies.map((curr) => (
                        <ListBox.Item key={curr.id} id={curr.id} textValue={curr.id} className="hover:bg-indigo-600 rounded-lg p-2.5 transition-colors text-sm">
                          {curr.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Min Salary Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400">Minimum Salary</label>
                <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                  <TbMoneybag className="text-zinc-500 text-xl flex-shrink-0" />
                  <Input
                    name="salaryMin"
                    type="number"
                    placeholder="e.g. 50000"
                    required
                    className="w-full text-white bg-transparent outline-none border-none focus:ring-0 text-sm"
                  />
                </div>
              </div>

              {/* Max Salary Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400">Maximum Salary</label>
                <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                  <TbMoneybag className="text-zinc-500 text-xl flex-shrink-0" />
                  <Input
                    name="salaryMax"
                    type="number"
                    placeholder="e.g. 80000"
                    required
                    className="w-full text-white bg-transparent outline-none border-none focus:ring-0 text-sm"
                  />
                </div>
              </div>

            </div>
          </div>
        </Fieldset>

        {/* SECTION 2: Role Details Card */}
        <Fieldset className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 w-full backdrop-blur-md shadow-2xl">
          <legend className="text-xl font-bold text-indigo-400 tracking-wide mb-2 px-1">
            Role Description & Criteria
          </legend>

          <div className="flex flex-col gap-6 w-full">
            {/* Summary Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Core Summary & Overview</label>
              <div className="border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 rounded-xl transition-all p-3">
                <TextArea
                  name="description"
                  placeholder="Tell candidates about the mission, goals, and high-level impact of this role..."
                  required
                  rows={4}
                  className="w-full text-white bg-transparent outline-none border-none focus:ring-0 resize-none text-sm"
                />
              </div>
            </div>

            {/* Responsibilities */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Key Responsibilities</label>
              <div className="border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 rounded-xl transition-all p-3">
                <TextArea
                  name="responsibilities"
                  placeholder="• List your day-to-day requirements..."
                  required
                  rows={5}
                  className="w-full text-white bg-transparent outline-none border-none focus:ring-0 resize-none text-sm"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Job Requirements & Skills</label>
              <div className="border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 rounded-xl transition-all p-3">
                <TextArea
                  name="requirements"
                  placeholder="• Required skills and professional background..."
                  required
                  rows={5}
                  className="w-full text-white bg-transparent outline-none border-none focus:ring-0 resize-none text-sm"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Perks & Benefits (Optional)</label>
              <div className="border border-white/20 hover:border-indigo-500 focus-within:!border-indigo-500 bg-zinc-950/50 rounded-xl transition-all p-3">
                <TextArea
                  name="benefits"
                  placeholder="• What perks are offered with this position?"
                  rows={3}
                  className="w-full text-white bg-transparent outline-none border-none focus:ring-0 resize-none text-sm"
                />
              </div>
            </div>
          </div>
        </Fieldset>

        {/* SECTION 3: Verified Corporate Context Block */}
        <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between gap-4 w-full backdrop-blur-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Publishing Organization
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Layers className="text-zinc-400 size-4" />
              <span className="text-base text-zinc-200 font-semibold">{companyInfo.name}</span>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
            Verified Partner
          </span>
        </div>

        {/* Footer Submits */}
        <div className="flex flex-row items-center justify-end gap-4 w-full pt-6 border-t border-white/10">
          <Button
            type="button"
            variant="flat"
            onClick={() => router.back()}
            className="bg-white/5 text-zinc-300 hover:bg-white/10 font-semibold rounded-xl h-11 px-6 transition-all"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-white rounded-xl h-11 px-8 shadow-xl shadow-indigo-600/20 transition-all"
          >
            Publish Opportunity
          </Button>
        </div>

      </Form>
    </div>
  );
}