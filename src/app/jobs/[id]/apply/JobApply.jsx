"use client";

import React, { useState } from "react";
// Hero UI exact imports based on your structure specifications
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Card,
  toast,
} from "@heroui/react";
// Icons
import { ArrowLeft, ArrowUpRight } from "@gravity-ui/icons";
import {
  LuLink,
  LuUser,
  LuMail,
  LuBriefcase,
  LuClock,
  LuGithub,
  LuLinkedin,
  LuGlobe,
} from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { submitApplication } from "@/lib/actions/applications";
import { redirect } from "next/navigation";

export default function JobApply({ job, applicant }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    resumeLink: "",
    experienceYears: "",
    availableToStart: "",
    githubLink: "",
    linkedinLink: "",
    portfolioLink: "",
    coverLetter: "",
    whyHireYou: "",
    bestProjects: "",
  });

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };
  console.log(job);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare complete payload structure
    const payload = {
      jobId: job?._id,
      jobTitle: job?.title,
      companyId: job?.companyId,
      companyName: job?.companyName,
      companyLogo: job?.companyLogo,
      applicantId: applicant?.id,
      ...formData,
      status: "applied",
    };

    console.log("Submitting Final Application Payload:", payload);

    const res = await submitApplication(payload);
    if (res.insertedId) {
      toast.success("Application Submitted Successfully!");
      setFormData({
        resumeLink: "",
        experienceYears: "",
        availableToStart: "",
        githubLink: "",
        linkedinLink: "",
        portfolioLink: "",
        coverLetter: "",
        whyHireYou: "",
        bestProjects: "",
      });
      redirect("/dashboards/seeker/applications")
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]  text-white py-12 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Informative Header Banner */}
        <div className="bg-[#121212] border border-[#232323] p-6 rounded-2xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            {job?.companyLogo && (
              <Image
                src={job.companyLogo}
                width={12}
                height={12}
                alt={job.companyName}
                className="w-12 h-12 rounded-xl bg-neutral-800 object-cover border border-neutral-700"
              />
            )}
            <div>
              <span className="text-xs text-purple-400 font-mono tracking-wider uppercase">
                Applying for
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-neutral-100">
                {job?.title}
              </h1>
              <p className="text-sm text-neutral-400">
                {job?.companyName} • {job?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Main Application Form */}
        <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* Section 1: Read-Only Personal Profile Context */}
          <Card className="bg-[#121212] border border-[#232323] p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase border-b border-neutral-800 pb-2">
              Applicant Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField isReadOnly defaultValue={applicant?.name}>
                <Label className="text-xs text-neutral-400 font-medium mb-1.5 block">
                  Full Name
                </Label>
                <div className="relative flex items-center">
                  <LuUser className="absolute left-3.5 text-neutral-500 w-4 h-4" />
                  <Input className="w-full bg-[#1e1e1e] border border-neutral-800 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-400 h-10 outline-none" />
                </div>
              </TextField>

              <TextField isReadOnly defaultValue={applicant?.email}>
                <Label className="text-xs text-neutral-400 font-medium mb-1.5 block">
                  Email Address
                </Label>
                <div className="relative flex items-center">
                  <LuMail className="absolute left-3.5 text-neutral-500 w-4 h-4" />
                  <Input className="w-full bg-[#1e1e1e] border border-neutral-800 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-400 h-10 outline-none" />
                </div>
              </TextField>
            </div>
          </Card>

          {/* Section 2: Links & Professional Profiles */}
          <Card className="bg-[#121212] border border-[#232323] p-6 rounded-2xl flex flex-col gap-6">
            <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase border-b border-neutral-800 pb-2">
              Professional Links
            </h3>

            {/* Resume File URL (Mandatory) */}
            <TextField>
              <Label className="text-xs text-neutral-300 font-medium mb-1.5 block">
                Resume Link (Google Drive / Dropbox){" "}
                <span className="text-rose-500">*</span>
              </Label>
              <div className="relative flex items-center">
                <LuLink className="absolute left-3.5 text-purple-400 w-4 h-4" />
                <Input
                  required
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={formData.resumeLink}
                  onChange={(e) =>
                    handleInputChange("resumeLink", e.target.value)
                  }
                  className="w-full bg-[#1e1e1e] border border-neutral-800 focus-within:border-neutral-600 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-200 h-10 outline-none transition-colors"
                />
              </div>
              <FieldError className="text-xs text-rose-500 mt-1" />
            </TextField>

            {/* GitHub Profile URL (Mandatory) */}
            <TextField>
              <Label className="text-xs text-neutral-300 font-medium mb-1.5 block">
                GitHub Profile Link <span className="text-rose-500">*</span>
              </Label>
              <div className="relative flex items-center">
                <LuGithub className="absolute left-3.5 text-purple-400 w-4 h-4" />
                <Input
                  required
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={formData.githubLink}
                  onChange={(e) =>
                    handleInputChange("githubLink", e.target.value)
                  }
                  className="w-full bg-[#1e1e1e] border border-neutral-800 focus-within:border-neutral-600 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-200 h-10 outline-none transition-colors"
                />
              </div>
            </TextField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LinkedIn Link (Optional) */}
              <TextField>
                <Label className="text-xs text-neutral-300 font-medium mb-1.5 block">
                  LinkedIn Profile Link (Optional)
                </Label>
                <div className="relative flex items-center">
                  <LuLinkedin className="absolute left-3.5 text-neutral-500 w-4 h-4" />
                  <Input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedinLink}
                    onChange={(e) =>
                      handleInputChange("linkedinLink", e.target.value)
                    }
                    className="w-full bg-[#1e1e1e] border border-neutral-800 focus-within:border-neutral-600 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-200 h-10 outline-none transition-colors"
                  />
                </div>
              </TextField>

              {/* Portfolio Link (Optional) */}
              <TextField>
                <Label className="text-xs text-neutral-300 font-medium mb-1.5 block">
                  Personal Portfolio Link (Optional)
                </Label>
                <div className="relative flex items-center">
                  <LuGlobe className="absolute left-3.5 text-neutral-500 w-4 h-4" />
                  <Input
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolioLink}
                    onChange={(e) =>
                      handleInputChange("portfolioLink", e.target.value)
                    }
                    className="w-full bg-[#1e1e1e] border border-neutral-800 focus-within:border-neutral-600 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-200 h-10 outline-none transition-colors"
                  />
                </div>
              </TextField>
            </div>
          </Card>

          {/* Section 3: Core Work Requirements */}
          <Card className="bg-[#121212] border border-[#232323] p-6 rounded-2xl flex flex-col gap-6">
            <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase border-b border-neutral-800 pb-2">
              Work Metrics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Experience Metric Input (Mandatory) */}
              <TextField>
                <Label className="text-xs text-neutral-300 font-medium mb-1.5 block">
                  Years of Relevant Experience{" "}
                  <span className="text-rose-500">*</span>
                </Label>
                <div className="relative flex items-center">
                  <LuBriefcase className="absolute left-3.5 text-purple-400 w-4 h-4" />
                  <Input
                    required
                    type="number"
                    min="0"
                    placeholder="e.g. 3"
                    value={formData.experienceYears}
                    onChange={(e) =>
                      handleInputChange("experienceYears", e.target.value)
                    }
                    className="w-full bg-[#1e1e1e] border border-neutral-800 focus-within:border-neutral-600 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-200 h-10 outline-none transition-colors"
                  />
                </div>
              </TextField>

              {/* Start Date Availability Input (Mandatory) */}
              <TextField>
                <Label className="text-xs text-neutral-300 font-medium mb-1.5 block">
                  Earliest Start Date <span className="text-rose-500">*</span>
                </Label>
                <div className="relative flex items-center">
                  <LuClock className="absolute left-3.5 text-purple-400 w-4 h-4" />
                  <Input
                    required
                    type="text"
                    placeholder="e.g. Immediately, 2 weeks notice"
                    value={formData.availableToStart}
                    onChange={(e) =>
                      handleInputChange("availableToStart", e.target.value)
                    }
                    className="w-full bg-[#1e1e1e] border border-neutral-800 focus-within:border-neutral-600 rounded-xl pl-10 pr-3 py-2 text-sm text-neutral-200 h-10 outline-none transition-colors"
                  />
                </div>
              </TextField>
            </div>
          </Card>

          {/* Section 4: Deep Dive Written Elaborations */}
          <Card className="bg-[#121212] border border-[#232323] p-6 rounded-2xl flex flex-col gap-6">
            <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase border-b border-neutral-800 pb-2">
              Questionnaire
            </h3>

            {/* Cover Letter Text Area (NEW: Mandatory) */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-1.5">
                <Label className="text-xs text-neutral-300 font-medium block">
                  Cover Letter <span className="text-rose-500">*</span>
                </Label>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Required
                </span>
              </div>
              <TextArea
                required
                aria-label="Cover letter statement context"
                placeholder="Write your professional introduction, detailing your relevant history, work ethic, and eagerness to join the team..."
                value={formData.coverLetter}
                onChange={(e) =>
                  handleInputChange("coverLetter", e.target.value)
                }
                className="w-full h-36 bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-600 rounded-xl p-3 text-sm text-neutral-200 outline-none transition-colors resize-none"
              />
            </div>

            {/* Why Hire You (Mandatory) */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-1.5">
                <Label className="text-xs text-neutral-300 font-medium block">
                  Why should we hire you for this position?{" "}
                  <span className="text-rose-500">*</span>
                </Label>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Required
                </span>
              </div>
              <TextArea
                required
                aria-label="Why hire you context"
                placeholder="Briefly showcase your expertise, highlights from previous jobs, and why you are an ideal fit..."
                value={formData.whyHireYou}
                onChange={(e) =>
                  handleInputChange("whyHireYou", e.target.value)
                }
                className="w-full h-28 bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-600 rounded-xl p-3 text-sm text-neutral-200 outline-none transition-colors resize-none"
              />
            </div>

            {/* Best Projects Description (Optional) */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-1.5">
                <Label className="text-xs text-neutral-300 font-medium block">
                  Describe your best project(s) and your specific contribution
                  (Optional)
                </Label>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Optional
                </span>
              </div>
              <TextArea
                aria-label="Best projects showcase context"
                placeholder="Tell us about a project you are proud of. What was your role, what tools did you use, and what was the outcome?"
                value={formData.bestProjects}
                onChange={(e) =>
                  handleInputChange("bestProjects", e.target.value)
                }
                className="w-full h-32 bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-600 rounded-xl p-3 text-sm text-neutral-200 outline-none transition-colors resize-none"
              />
            </div>
          </Card>

          {/* Form Actions Section */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="reset"
              onClick={() =>
                setFormData({
                  resumeLink: "",
                  experienceYears: "",
                  availableToStart: "",
                  githubLink: "",
                  linkedinLink: "",
                  portfolioLink: "",
                  whyHireYou: "",
                  coverLetter: "",
                  bestProjects: "",
                })
              }
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-sm transition-colors bg-transparent"
            >
              Reset Form
            </Button>

            <Button
              type="submit"
              isLoading={loading}
              className="px-6 py-2.5 font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md"
            >
              {loading ? "Processing..." : "Submit Application"}
              {!loading && <ArrowUpRight className="w-4 h-4" />}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
