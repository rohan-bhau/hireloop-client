"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Form, 
  Fieldset, 
  Select, 
  ListBox,
  Button, 
  Switch,
  Label,
  Description,
  Toast,
  toast,
  Chip,
  Card
} from "@heroui/react";
// Icons
import { Briefcase, Calendar, Layers, ChevronDown, ShieldCheck, Clock } from "@gravity-ui/icons";
import { TbAlertTriangle, TbMoneybag } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { createJob } from "@/lib/actions/jobs";

export default function NewJobForm({ company }) {
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

  const companyStatus = company?.status?.toLowerCase() || "pending";
  const isApproved = companyStatus === "approved";

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

    if (!isApproved) {
      setError("Your company profile must be approved before publishing job openings.");
      return;
    }

    setIsLoading(true);

    const parsedCategory = Array.from(category)[0] || "";
    const parsedType = Array.from(type)[0] || "";
    const parsedCurrency = Array.from(currency)[0] || "USD";

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
      const res = await createJob(completeJobPayload);
      
      if (res && (res.insertedId || res.acknowledged === true)) {
        setSuccess("Job listing published successfully! Redirecting...");
        toast.success("Job Posted Successfully");

        // Clear Fields
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

  const renderStatusBadge = () => {
    switch (companyStatus) {
      case "approved":
        return (
          <Chip color="success" variant="flat" className="font-bold uppercase tracking-wider text-[10px] px-2 py-1">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Profile</span>
            </div>
          </Chip>
        );
      case "pending":
        return (
          <Chip color="warning" variant="flat" className="font-bold uppercase tracking-wider text-[10px] px-2 py-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Awaiting Approval</span>
            </div>
          </Chip>
        );
      case "rejected":
        return (
          <Chip color="danger" variant="flat" className="font-bold uppercase tracking-wider text-[10px] px-2 py-1">
            <div className="flex items-center gap-1">
              <TbAlertTriangle className="w-3.5 h-3.5" />
              <span>Rejected Profile</span>
            </div>
          </Chip>
        );
      default:
        return (
          <Chip color="default" variant="flat" className="font-bold uppercase tracking-wider text-[10px] px-2 py-1">
            {companyStatus}
          </Chip>
        );
    }
  };

  return (
    
    <div className="bg-[#020617]">
          <div className="w-full max-w-4xl mx-auto py-12 px-6 text-white  min-h-screen">
      <Toast.Provider />

      {/* PAGE HEADER */}
      <div className="mb-10 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Post a New Position
          </h1>
          <p className="text-sm text-zinc-400">
            Publish and broadcast your workspace position across our elite global network.
          </p>
        </div>
        
        <div className="flex flex-row items-center gap-3 bg-zinc-950/40 border border-neutral-800/60 rounded-2xl px-4 py-2.5 w-fit">
          <div className="flex flex-col text-left">
            <span className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider leading-none">Organization</span>
            <span className="text-xs font-bold text-neutral-200 mt-1">{company?.name || "No Corporate Attached"}</span>
          </div>
          <div className="shrink-0 pl-1">{renderStatusBadge()}</div>
        </div>
      </div>

      {/* MESSAGES */}
      {error && (
        <div className="mb-6 rounded-xl bg-danger-500/10 border border-danger-500/20 p-4 text-sm text-danger-400 backdrop-blur-sm animate-fade-in">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-400 backdrop-blur-sm animate-fade-in">
          {success}
        </div>
      )}

      {/* CONDITIONAL RENDERING */}
      {isApproved ? (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-10">
          
          {/* SECTION 1: Job Info */}
          <Fieldset className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 w-full backdrop-blur-md shadow-2xl">
            <legend className="text-xl font-bold text-indigo-400 tracking-wide mb-2 px-1">
              Job Details & Parameters
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
                <div className="flex flex-col gap-2 mt-2 w-full">
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

            <div className="p-5 rounded-xl bg-zinc-950/40 border border-white/10 w-full flex flex-col gap-4 mt-2">
              <span className="text-sm font-semibold text-zinc-200">Compensation Package</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
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

          {/* SECTION 2: Role Details */}
          <Fieldset className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 w-full backdrop-blur-md shadow-2xl">
            <legend className="text-xl font-bold text-indigo-400 tracking-wide mb-2 px-1">
              Role Description & Criteria
            </legend>

            <div className="flex flex-col gap-6 w-full">
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

          {/* Action Buttons */}
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
      ) : (
        /* ✅ FIXED: অবজেক্ট বা লকিং জ্যাম এড়াতে রিটার্ন ব্লককে একটি সিঙ্গেল প্যারেন্ট নোডে লক করা হয়েছে */
        <Card className="bg-[#0f172a]/40 border border-amber-500/20 rounded-3xl p-10 md:p-14 text-center flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto mt-6 shadow-2xl backdrop-blur-md">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Clock className="w-7 h-7 animate-pulse" />
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
              Verification Pending Notice
            </h2>
            <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed mt-2 font-light">
              Your company profile for <span className="text-indigo-400 font-semibold">{company?.name || "this workspace"}</span> is currently under system analysis. You don't have permission to host job opening listings yet.
            </p>
          </div>

          <div className="w-full max-w-sm bg-zinc-950/50 border border-neutral-900 rounded-2xl p-4 text-xs text-neutral-500 font-medium font-mono tracking-wide">
            SYSTEM STATUS: {companyStatus.toUpperCase()}
          </div>

          <p className="text-xs text-neutral-500 leading-normal max-w-sm">
            Please allow up to 24-48 business hours for admin approval logs to verify your corporate deployment setup permissions.
          </p>

          <Button
            onClick={() => router.push("/dashboards/recruiter")}
            className="mt-2 bg-[#1c1c1e] border border-neutral-800 text-neutral-300 font-semibold px-6 rounded-xl text-xs h-10 hover:bg-neutral-800 transition-colors"
          >
            Return to Dashboard
          </Button>
        </Card>
      )}
    </div>
</div>
  );
}