"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Form, 
  Fieldset, 
  Input, 
  TextArea, 
  Select, 
  ListBox,
  Button, 
  Chip,
  Toast,
  toast
} from "@heroui/react";
// Icons
import { 
  Layers, 
  Globe, 
  Persons, 
  Pencil, 
  Check, 
  Plus, 
  ChevronDown 
} from "@gravity-ui/icons";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { createCompany } from "@/lib/actions/company";

export default function CompanyProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Core Processing States
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Core Company Profile State (Can be null to simulate "No Company Registered")
  const [company, setCompany] = useState(null);

  // Controlled Form Fields State Management
  const [name, setName] = useState(company?.name || "");
  const [websiteUrl, setWebsiteUrl] = useState(company?.websiteUrl || "");
  const [logoUrl, setLogoUrl] = useState(company?.logoUrl || "");
  const [industry, setIndustry] = useState(company?.industry || new Set([]));
  const [location, setLocation] = useState(company?.location || "");
  const [employeeCount, setEmployeeCount] = useState(company?.employeeCount || new Set([]));
  const [description, setDescription] = useState(company?.description || "");

  const industries = [
    { id: "technology", label: "Technology & Engineering" },
    { id: "design", label: "Design & Creative" },
    { id: "marketing", label: "Marketing & Growth" },
    { id: "finance", label: "Finance & Accounting" }
  ];

  const employeeRanges = [
    { id: "1-10", label: "1-10 employees" },
    { id: "11-50", label: "11-50 employees" },
    { id: "51-200", label: "51-200 employees" },
    { id: "201-500", label: "201-500 employees" },
    { id: "500+", label: "500+ employees" }
  ];

  // ImgBB Upload Handler Using process.env.NEXT_PUBLIC_IMAGE_API
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const apiKey = process.env.NEXT_PUBLIC_IMAGE_API;
    if (!apiKey) {
      console.error("ImgBB Key Missing: Ensure NEXT_PUBLIC_IMAGE_API is declared in your .env file.");
      toast("Configuration error: Missing Upload Authorization Key.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Connect to ImgBB using your environment key parameter variable
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();
      
      if (resData.success && resData.data?.url) {
        setLogoUrl(resData.data.url);
        toast("Logo uploaded and hosted successfully!");
      } else {
        toast("Logo hosting upload sequence failed.");
      }
    } catch (err) {
      console.error("ImgBB Upload Exception Context:", err);
      toast("Error uploading image to file cluster.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleEdit = () => {
    if (!company) {
      setName("");
      setWebsiteUrl("");
      setLogoUrl("");
      setIndustry(new Set([]));
      setLocation("");
      setEmployeeCount(new Set([]));
      setDescription("");
    } else {
      setName(company.name);
      setWebsiteUrl(company.websiteUrl);
      setLogoUrl(company.logoUrl);
      setIndustry(company.industry);
      setLocation(company.location);
      setEmployeeCount(company.employeeCount);
      setDescription(company.description);
    }
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedCompanyPayload = {
      name,
      websiteUrl,
      logoUrl: logoUrl || "https://i.ibb.co/6R4Z9bM/default-logo.png",
      industry,
      location,
      employeeCount,
      description,
      status: company?.status || "pending" 
    };

    try {
      console.log("Saving Corporate Context Block Data:", updatedCompanyPayload);
      
      // Simulated Database Integration Layer Hook
      // const res = await saveCompanyAction(updatedCompanyPayload);

        setCompany(updatedCompanyPayload);
        const payload = await createCompany(updatedCompanyPayload)
        if (payload.insertedId) {
      toast.success("Company Profile Saved Successfully");
            
        }
        console.log(updatedCompanyPayload)
      setIsEditing(false);
    } catch (err) {
      toast("An error occurred while saving organization modifications.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "danger";
    return "warning";
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <div className="w-full max-w-4xl mx-auto py-12 px-6">
        
        {/* Safe Toast Overlay Render Container Context */}
        <Toast.Provider />

        {/* Main Title Banner Header */}
        <div className="mb-10 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Company Workspace Profile
            </h1>
            <p className="text-sm text-zinc-400">
              Manage your organization information profile to unlock verified marketplace recruitment metrics.
            </p>
          </div>

          {company && !isEditing && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Verification Status</span>
                <Chip color={getStatusColor(company.status)} size="sm" variant="soft" className="capitalize font-bold px-3">
                  {company.status}
                </Chip>
              </div>
            </div>
          )}
        </div>

        {/* CASE 1: No Company Profile Registered */}
        {!company && !isEditing ? (
          <div className="bg-[#0f172a]/40 border border-dashed border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
              <Layers className="size-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-200">No Corporate Entity Registered</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              You must initialize and map an approved workspace group profile before publishing role opportunities on HireLoop.
            </p>
            <Button
              onClick={handleToggleEdit}
              color="primary"
              className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-white rounded-xl h-11 px-6 mt-2"
              startContent={<Plus />}
            >
              Register Company
            </Button>
          </div>
        ) : isEditing ? (
          
          /* CASE 2: Editing/Registration Input Form Mode */
          <Form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Fieldset className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 w-full backdrop-blur-md shadow-2xl">
              <legend className="text-xl font-bold text-indigo-400 tracking-wide mb-4 px-1">
                {company ? "Update Corporate Record Parameters" : "Register New Hiring Entity Organization"}
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Company Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-300">Company Name</label>
                  <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                    <Layers className="text-zinc-500 text-lg flex-shrink-0" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Acme Corp"
                      required
                      className="w-full text-white bg-transparent outline-none border-none focus:ring-0 text-sm"
                    />
                  </div>
                </div>

                {/* Website URL Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-300">Website URL</label>
                  <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                    <Globe className="text-zinc-500 text-lg flex-shrink-0" />
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                      required
                      className="w-full text-white bg-transparent outline-none border-none focus:ring-0 text-sm"
                    />
                  </div>
                </div>

                {/* Industry Selection Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-300">Industry Category</label>
                  <Select 
                    placeholder="Select Industry" 
                    selectedKeys={industry}
                    onSelectionChange={setIndustry}
                    className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl"
                  >
                    <Select.Trigger className="h-12 border-none px-4">
                      <Select.Value className="text-zinc-300 text-sm" />
                      <Select.Indicator><ChevronDown className="text-zinc-400" /></Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#0f172a] text-white border border-white/10 rounded-xl p-1 shadow-2xl">
                        {industries.map((ind) => (
                          <ListBox.Item key={ind.id} id={ind.id} textValue={ind.label} className="hover:bg-indigo-600 rounded-lg p-2.5 text-sm transition-all">
                            {ind.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Employee Range Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-300">Employee Scale Range</label>
                  <Select 
                    placeholder="Select Count Range" 
                    selectedKeys={employeeCount}
                    onSelectionChange={setEmployeeCount}
                    className="w-full text-white bg-zinc-950/50 border border-white/20 hover:border-indigo-500 rounded-xl"
                  >
                    <Select.Trigger className="h-12 border-none px-4">
                      <Select.Value className="text-zinc-300 text-sm" />
                      <Select.Indicator><ChevronDown className="text-zinc-400" /></Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#0f172a] text-white border border-white/10 rounded-xl p-1 shadow-2xl">
                        {employeeRanges.map((range) => (
                          <ListBox.Item key={range.id} id={range.id} textValue={range.label} className="hover:bg-indigo-600 rounded-lg p-2.5 text-sm transition-all">
                            {range.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              {/* Office Location Input */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <label className="text-sm font-semibold text-zinc-300">Office Headquarter Location</label>
                <div className="flex items-center gap-3 border border-white/20 hover:border-indigo-500 focus-within:border-indigo-500 bg-zinc-950/50 h-12 rounded-xl transition-all px-4">
                  <GrLocation className="text-zinc-500 text-lg flex-shrink-0" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dhaka, Bangladesh"
                    required
                    className="w-full text-white bg-transparent outline-none border-none focus:ring-0 text-sm"
                  />
                </div>
              </div>

              {/* Logo Brand Upload Module */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <label className="text-sm font-semibold text-zinc-300">Company Brand Logo</label>
                <div className="p-6 rounded-xl border border-white/10 bg-zinc-950/40 flex flex-col sm:flex-row items-center gap-6">
                  
                  <div className="w-20 h-20 rounded-xl border border-white/10 bg-zinc-900/60 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Preview logo" className="w-full h-full object-cover" />
                    ) : (
                      <Layers className="text-zinc-600 size-6" />
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      ref={fileInputRef} 
                      className="hidden" 
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      isLoading={isUploading}
                      variant="flat"
                      className="bg-white/5 hover:bg-white/10 text-zinc-300 h-10 px-4 rounded-xl text-sm"
                      startContent={<FaCloudUploadAlt />}
                    >
                      Upload Logo Image
                    </Button>
                    <span className="text-xs text-zinc-500">Supports images up to 5MB. Hosted directly via your cloud connection.</span>
                  </div>
                </div>
              </div>

              {/* Narrative Description TextArea Container */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <label className="text-sm font-semibold text-zinc-300">Brief Narrative Description</label>
                <div className="border border-white/20 hover:border-indigo-500 focus-within:border-indigo-500 bg-zinc-950/50 rounded-xl p-3">
                  <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your company's core values, mission statement, and goals..."
                    required
                    rows={4}
                    className="w-full text-white bg-transparent outline-none border-none focus:ring-0 resize-none text-sm"
                  />
                </div>
              </div>
            </Fieldset>

            {/* Form Actions Footer Row */}
            <div className="flex flex-row items-center justify-end gap-4 w-full pt-4 border-t border-white/5">
              {company && (
                <Button
                  type="button"
                  variant="flat"
                  onClick={() => setIsEditing(false)}
                  className="bg-white/5 text-zinc-300 hover:bg-white/10 font-semibold rounded-xl h-11 px-6"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-white rounded-xl h-11 px-8 shadow-xl shadow-indigo-600/20"
                startContent={<Check />}
              >
                Save Brand Workspace
              </Button>
            </div>
          </Form>
        ) : (
          
          /* CASE 3: Profile Details Frame View (Read-Only State Mode) */
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start w-full backdrop-blur-md shadow-2xl">
              
              <div className="w-24 h-24 rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden flex-shrink-0 flex items-center justify-center p-2 shadow-inner">
                <img src={company.logoUrl} alt={`${company.name} Logo`} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 flex flex-col gap-4 w-full">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">{company.name}</h2>
                  <div className="flex items-center gap-2 text-indigo-400 mt-1">
                    <Globe className="size-4" />
                    <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="text-sm hover:underline font-medium">
                      {company.websiteUrl}
                    </a>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl bg-zinc-950/30 p-4 rounded-xl border border-white/5">
                  {company.description}
                </p>

                {/* Core Parameter Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <Layers className="text-zinc-500 size-5 flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold font-mono tracking-wider">Sector Industry</span>
                      <span className="text-sm font-semibold text-zinc-200 capitalize truncate">
                        {Array.from(company.industry)|| "Not Set"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <GrLocation className="text-zinc-500 size-5 flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold font-mono tracking-wider">Headquarters</span>
                      <span className="text-sm font-semibold text-zinc-200 truncate">{company.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <Persons className="text-zinc-500 size-5 flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold font-mono tracking-wider">Team Size</span>
                      <span className="text-sm font-semibold text-zinc-200 truncate">
                        {Array.from(company.employeeCount) || "Not Set"} employees
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Toggle Action Trigger Button */}
                <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
                  <Button
                    onClick={handleToggleEdit}
                    variant="flat"
                    className="bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20 text-indigo-400 font-semibold rounded-xl h-10 px-5 transition-all"
                    startContent={<Pencil className="size-4" />}
                  >
                    Edit Information Details
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}