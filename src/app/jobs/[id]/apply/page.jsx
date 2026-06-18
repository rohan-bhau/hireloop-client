import { getJobsById } from '@/lib/api/jobs'
import { getUserSession } from '@/lib/core/session'
import { getApplicationsByApplicant } from '@/lib/api/applications'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import JobApply from './JobApply'
// Icons
import { ArrowLeft, Rocket } from '@gravity-ui/icons'
import { LuCircleCheckBig, LuSparkles } from 'react-icons/lu'
// Fixed Imports: Bringing in ProgressBar and Label together based on your shared anatomy
import { Button, Card, ProgressBar, Label } from '@heroui/react'
import { TbAlertTriangle } from 'react-icons/tb'
import { getPlansById } from '@/lib/api/plans'

const ApplyPage = async ({ params }) => {
  const { id } = await params
  const user = await getUserSession()

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center">
        <TbAlertTriangle className="text-amber-500 w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
          Only Job Seekers can apply for roles. Please register or log in with a job seeker profile to submit applications.
        </p>
      </div>
    )
  }

  // Parallelize backend fetch requests to maximize speed
  const [job, applications] = await Promise.all([
    getJobsById(id),
    getApplicationsByApplicant(user.id)
  ])
  const plan = await getPlansById(user?.plan || "seeker-free")

  // 1. Condition Check: Has this user already submitted an application to this specific job?
  const alreadyApplied = applications.some(
    (app) => app.jobId === id || app.jobId === job?._id?.['$oid'] || app.jobId?.['$oid'] === id
  )

  // 2. Condition Check: Has the user burned through their monthly allowance credits?
  const creditLimitExceeded = applications.length >= plan.maxApplicationPerMonth
  
  // Calculate raw progress percentage safely
  const progressValue = Math.min((applications.length / plan.maxApplicationPerMonth) * 100, 100);

  return (
    <div className="min-h-screen mt-10 bg-[#0a0a0a] text-white py-12 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        
        {/* Universal Back Navigation */}
        <Link 
          href={`/jobs/${id}`} 
          className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to position details
        </Link>

        {/* REWORKED: Credit System Tracking via explicit Compound ProgressBar Anatomy */}
        <Card className="bg-[#121212] border border-[#232323] p-6 rounded-2xl mb-8 flex flex-col gap-3">
          <ProgressBar value={progressValue} className="w-full">
            <div className="flex justify-between items-center text-sm mb-2">
              <Label className="text-neutral-400 font-medium">
                Current Plan: <span className="text-purple-400 font-semibold">{plan.name}</span>
              </Label>
              <ProgressBar.Output className="text-neutral-300 font-mono text-xs">
                {applications.length} / {plan.maxApplicationPerMonth} used
              </ProgressBar.Output>
            </div>
            
            {/* The structural layout track mapping */}
            <ProgressBar.Track className="h-2 w-full bg-[#1e1e1e] rounded-full overflow-hidden border border-neutral-800">
              <ProgressBar.Fill 
                className={`h-full rounded-full transition-all duration-500 ${
                  creditLimitExceeded 
                    ? "bg-gradient-to-r from-rose-600 to-red-500" 
                    : "bg-gradient-to-r from-purple-600 to-indigo-500"
                }`} 
              />
            </ProgressBar.Track>
          </ProgressBar>
        </Card>

        {/* CONDITION SCENARIO 1: Candidate has already applied once */}
        {alreadyApplied ? (
          <Card className="bg-[#121212] border border-[#232323] p-8 rounded-2xl text-center flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <LuCircleCheckBig size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-100">Application already submitted</h2>
              <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                You have successfully expressed interest in the <span className="text-neutral-200 font-medium">{job?.title || "Software Engineer"}</span> role at <span className="text-neutral-200 font-medium">{job?.companyName || "this company"}</span>. Multiple submissions aren't necessary.
              </p>
            </div>
            <Link href="/dashboards/seeker/applications">
              <Button
                className="mt-2 bg-[#1e1e1e] border border-neutral-800 text-neutral-200 font-medium px-6 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Track Application Status
              </Button>
            </Link>
          </Card>
        ) 
        
        /* CONDITION SCENARIO 2: Usage tokens depleted entirely */
        : creditLimitExceeded ? (
          <Card className="bg-[#121212] border border-red-900/40 p-8 rounded-2xl text-center flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-800/80 flex items-center justify-center text-red-400">
              <Rocket className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-100">Monthly Application Limit Reached</h2>
              <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                You've utilized your full quota of <span className="text-red-400 font-semibold">{plan.maxApplicationPerMonth} entries</span> for the billing cycle under your current plan permissions.
              </p>
            </div>
            
            <div className="w-full bg-[#1e1e1e] border border-neutral-800 p-4 rounded-xl flex items-center justify-between gap-4 mt-2 text-left">
              <div className="flex gap-3 items-center">
                <LuSparkles className="text-yellow-400 w-5 h-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-neutral-200">Unlock Pro Subscriptions</p>
                  <p className="text-xs text-neutral-500">Get unlimited job submittals, fast responses, and profile highlights.</p>
                </div>
              </div>
              <Link href="/plans">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold text-white px-5 rounded-xl text-xs h-9 shrink-0 shadow-md hover:opacity-95 transition-opacity"
                >
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </Card>
        ) 
        
        /* DEFAULT SCENARIO: Clean slate, candidate can apply safely */
        : (
          <JobApply job={job} applicant={user} />
        )}

      </div>
    </div>
  )
}

export default ApplyPage;