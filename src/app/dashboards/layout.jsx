import { DashboardSlideBar } from '@/components/dashboards/DashboardSlidebar'
import React from 'react'

const RecruiterDashboard = ({ children }) => {
  return (
    // Fixed broken layout classes and added pt-20 to push contents past the fixed navbar
    <div className='flex flex-col md:flex-row min-h-screen pt-20 px-6 gap-6'>
      <div >
        <DashboardSlideBar />
      </div>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}

export default RecruiterDashboard