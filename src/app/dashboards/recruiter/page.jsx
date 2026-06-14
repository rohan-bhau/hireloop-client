'use client'
import StatsGrid from '@/components/StatsGrid';
import { useSession } from '@/lib/auth-client'
import { Briefcase,Thunderbolt, Persons, CircleCheck } from "@gravity-ui/icons";
const RecruiterHomePage = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const recruiterStats = [
    { label: "Total Job Posts", value: 49, icon: Briefcase, color: "text-indigo-400 bg-indigo-500/10" },
    { label: "Total Applicants", value: 1284, icon: Persons, color: "text-emerald-400 bg-emerald-500/10" },
    { label: "Active Jobs", value: 22, icon: Thunderbolt, color: "text-amber-400 bg-amber-500/10" },
    { label: "Jobs Closed", value: 32, icon: CircleCheck, color: "text-pink-400 bg-pink-500/10" },
  ];
  return (
    <div>
          <h2 className='text-3xl font-semibold mb-10'>Welcome back, {user?.name}!</h2>
          <StatsGrid items={recruiterStats} />
    </div>
  )
}

export default RecruiterHomePage