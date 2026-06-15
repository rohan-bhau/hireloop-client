
import {LayoutSideContent, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from "next/link";
import { CgOrganisation } from "react-icons/cg";
import { FaBriefcase } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

export function DashboardSlideBar() {
  const navItems= [
    {icon: House,href:"/dashboards/recruiter", label: "Home"},
    {icon: FaBriefcase ,href:"/dashboards/recruiter/jobs", label: "Jobs"},
    {icon: IoAddCircleOutline ,href:"/dashboards/recruiter/jobs/new", label: "Post a Job"},
    {icon: CgOrganisation  ,href:"/dashboards/recruiter/company", label: "Company Profile"},
    {icon: Envelope,href:"/recruiter", label: "Messages"},
    {icon: Person,href:"/recruiter", label: "Profile"},
    {icon: Gear,href:"/recruiter", label: "Settings"},
    ];
    const navLinks =               <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link href={item.href}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>

  return (
      <>
          <aside className="hidden lg:block border-r border-default p-4 w-64 shrink-0 h-full">
              {navLinks}
          </aside>

      <Drawer>
      <Button className={"lg:hidden"} variant="secondary">
        <LayoutSideContent />
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
                {navLinks}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
      </>
  );
}