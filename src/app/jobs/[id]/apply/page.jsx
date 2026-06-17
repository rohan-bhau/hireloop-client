import { getJobsById } from '@/lib/api/jobs'
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import React from 'react'
import JobApply from './JobApply'

const ApplyPage = async ({params}) => {
    const {id}=await params
    const user = await getUserSession()
    console.log(user)
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
    }

    if (user.role !== "seeker") {
        return <h2 className='mt-30'>Only Job seeker can apply for a job. Please login with a job seeker account to apply this job</h2>
    }

    const job = await getJobsById(id)
    console.log(job)

  return (
    <div>
          <JobApply job={job} applicant={user}/>
    </div>
  )
}

export default ApplyPage
