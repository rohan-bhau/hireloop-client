import React from 'react'
import NewJobForm from './NewJobForm'
import { getLoggedInRecruiterCompany } from '@/lib/api/companies'

const NewJobPage = async() => {
const company = await getLoggedInRecruiterCompany()
    console.log("logged in recruiter company", company)
  return (
    <div>
      <NewJobForm company={company} />
    </div>
  )
}

export default NewJobPage
