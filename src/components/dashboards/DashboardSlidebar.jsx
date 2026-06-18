import { getUserSession } from "@/lib/core/session";
import SidebarNavContainer from "./SidebarNavContainer";

export async function DashboardSlideBar() {
  const user = await getUserSession();

  const seekerNavItems = [
    { iconId: "dashboard", href: "/dashboards/seeker", label: "Dashboard" },
    { iconId: "jobs", href: "/jobs", label: "Jobs" },
    { iconId: "saved-jobs", href: "/dashboards/seeker/saved-jobs", label: "Saved Jobs" },
    { iconId: "applications", href: "/dashboards/seeker/applications", label: "Applications" },
    { iconId: "billing", href: "/dashboards/seeker/billing", label: "Billing" },
    { iconId: "settings", href: "/dashboards/seeker/settings", label: "Settings" }
  ];

  const recruiterNavItems = [
    { iconId: "home", href: "/dashboards/recruiter", label: "Home" },
    { iconId: "jobs-recruiter", href: "/dashboards/recruiter/jobs", label: "Jobs" },
    { iconId: "post-job", href: "/dashboards/recruiter/jobs/new", label: "Post a Job" },
    { iconId: "company", href: "/dashboards/recruiter/company", label: "Company Profile" },
    { iconId: "messages", href: "/recruiter/messages", label: "Messages" },
    { iconId: "profile", href: "/recruiter/profile", label: "Profile" },
    { iconId: "settings", href: "/dashboards/recruiter/settings", label: "Settings" }
  ];

  const navItems = user?.role === "recruiter" ? recruiterNavItems : seekerNavItems;

  return (
    <SidebarNavContainer navItems={navItems} user={user} />
  );
}