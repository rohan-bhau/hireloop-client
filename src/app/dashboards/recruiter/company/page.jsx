import React from 'react'
import CompanyProfile from './CompanyProfile'
import { getUserSession } from '@/lib/core/session'
import { getRecruiterCompany } from '@/lib/api/companies'

const CompanyProfilePage = async () => {
    const user = await getUserSession()
    console.log("user session from company page", user)

  const company = await getRecruiterCompany(user?.id)
  // console.log(company)

  return (
    <div>
      <CompanyProfile recruiter={user} company={company} />
    </div>
  )
}

export default CompanyProfilePage
