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
  Description,
  Toast,
  toast
} from "@heroui/react";
// Icons
import { Briefcase, Calendar, Layers, ChevronDown } from "@gravity-ui/icons";
import { TbMoneybag } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { createJob } from "@/lib/actions/jobs";

export default function NewJobForm({company}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRemote, setIsRemote] = useState(false);

  // Controlled Form Field States
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState(new Set([]));
  const [type, setType] = useState(new Set([]));
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState(new Set(["USD"]));
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");

  const companyInfo = {
    id: company?._id,
    name: company?.name,
    status: company?.status
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

    // if (companyInfo.status !== "approved") {
    //   setError("Your company profile must be approved before publishing job openings.");
    //   return;
    // }

    setIsLoading(true);

    const parsedCategory = category|| "";
    const parsedType = type || "";
    const parsedCurrency = currency|| "USD";
    console.log({"category": category, "type":type, "currency":currency})

    const completeJobPayload = {
      title,
      deadline,
      category: parsedCategory,
      type: parsedType,
      isRemote,
      location: isRemote ? "Remote" : location,
      currency: parsedCurrency,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      description,
      responsibilities,
      requirements,
      benefits,
      companyId: company?._id,
      companyName: company?.name,
      status: "active",
      createdAt: new Date().toISOString(),
      companyLogo: company?.logoUrl,
      companyWebsite: company?.websiteUrl
    };

    try {
      console.log("Submitting Payload to Backend Server Action:", completeJobPayload);
      const res = await createJob(completeJobPayload);
      
      if (res && (res.insertedId || res.acknowledged === true)) {
        setSuccess("Job listing published successfully! Redirecting...");
        
        // Correct Hero UI v3 Toast call
        toast.success("Job Posted Successfully");

        // Clear Controlled Inputs
        setTitle("");
        setDeadline("");
        setCategory(new Set([]));
        setType(new Set([]));
        setLocation("");
        setSalaryMin("");
        setSalaryMax("");
        setDescription("");
        setResponsibilities("");
        setRequirements("");
        setBenefits("");
        setIsRemote(false);

        setTimeout(() => {
          router.push("/dashboards/recruiter");
        }, 1200);
      } else {
        setError("Database server failed to verify submission entry.");
      }

    } catch (err) {
      console.error(err);
      setError("An unexpected network link breakdown occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 text-white bg-[#020617] min-h-screen">
      
      {/* Hero UI Toast Provider injected contextually inside the container */}
      <Toast.Provider />

      {/* Page Header */}
      <div className="mb-10 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Post a New Position
        </h1>
        <p className="text-sm text-zinc-400">
          Fill out the fields below to publish and broadcast your position across our network.
        </p>
      </div>

      {/* Inline Banner Feedback Messages */}
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

      <Form onSubmit={handleSubmit} className="flex flex-col gap-10">
        
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
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="w-full text-zinc-300 bg-transparent outline-none border-none focus:ring-0 text-sm"
                />
              </div>
            </div>

            {/* Job Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Job Category</label>
              <Select 
                placeholder="Select category" 
                selectedKeys={category}
                onSelectionChange={setCategory}
                className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl"
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
                placeholder="Select type" 
                selectedKeys={type}
                onSelectionChange={setType}
                className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl"
              >
                <Select.Trigger className="h-12 border-none px-4">
                  <Select.Value className="text-zinc-300 text-sm" />
                  <Select.Indicator><ChevronDown className="text-zinc-400" /></Select.Indicator>
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0f172a] text-white border border-white/10 rounded-xl p-1 shadow-2xl">
                    {jobTypes.map((t) => (
                      <ListBox.Item key={t.id} id={t.id} textValue={t.label} className="hover:bg-indigo-600 rounded-lg p-2.5 transition-colors text-sm">
                        {t.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>

          {/* Location Panel using document anatomy layout */}
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
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
              
              {/* Currency */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400">Currency</label>
                <Select 
                  placeholder="Currency" 
                  selectedKeys={currency}
                  onSelectionChange={setCurrency}
                  className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl"
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
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
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
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
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
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <textarea
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
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
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
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
                <textarea
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="• What perks are offered with this position?"
                  rows={3}
                  className="w-full text-white bg-transparent outline-none border-none focus:ring-0 resize-none text-sm"
                />
              </div>
            </div>
          </div>
        </Fieldset>

        {/* SECTION 3: Organization Info Block */}
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

        {/* Action Controls */}
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