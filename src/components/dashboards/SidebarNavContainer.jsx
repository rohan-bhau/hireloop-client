"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";

// Icons 
import { House, Envelope, Gear, Person, Briefcase, Bookmark, LayoutSideContent, Xmark } from "@gravity-ui/icons";
import { FaBriefcase } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
import { LuCreditCard, LuFileText, LuLayoutGrid } from "react-icons/lu";

const getIcon = (iconId, className) => {
  const iconMap = {
    dashboard: <LuLayoutGrid className={className} />,
    jobs: <Briefcase className={className} />,
    "saved-jobs": <Bookmark className={className} />,
    applications: <LuFileText className={className} />,
    billing: <LuCreditCard className={className} />,
    settings: <Gear className={className} />,
    
    home: <House className={className} />,
    "jobs-recruiter": <FaBriefcase className={className} />,
    "post-job": <IoAddCircleOutline className={className} />,
    company: <CgOrganisation className={className} />,
    messages: <Envelope className={className} />,
    profile: <Person className={className} />
  };

  return iconMap[iconId] || <Briefcase className={className} />;
};

export default function SidebarNavContainer({ navItems, user }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const displayRole = user?.role === "recruiter" ? "Recruiter Dashboard" : "Seeker Dashboard";
  const displayPlan = user?.plan ? user.plan.replace('seeker-', '').replace('recruiter-', '') : "Free";

  const renderNavLinks = (onItemClick = () => {}) => (
    <nav className="flex flex-col gap-1 w-full">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.label}
            onClick={onItemClick}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-[#1c1c1e] text-white shadow-sm border border-neutral-800/60"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
            }`}
          >
            {getIcon(
              item.iconId, 
              `size-5 shrink-0 transition-colors ${isActive ? "text-purple-400" : "text-neutral-500"}`
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const renderSidebarContent = (onItemClick = () => {}) => (
    <div className="flex flex-col h-full justify-between bg-[#09090b] text-white p-4">
      <div className="w-full">
        {/* brand logo area */}
        <div className="px-2 mb-6 pt-2">
          <h2 className="text-xl font-black text-white tracking-tight leading-none">HireLoop</h2>
          <span className="text-[10px] text-neutral-500 font-medium tracking-wide mt-1 block uppercase">
            {displayRole}
          </span>
        </div>

        <hr className="border-neutral-900 mb-6 mx-2" />
        
        {/* main links*/}
        {renderNavLinks(onItemClick)}
      </div>

      {/* bottom user empty card */}
      <div className="w-full pt-4 border-t border-neutral-900 px-2 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shrink-0 uppercase shadow-md">
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-neutral-200 truncate">{user?.name}</span>
            <span className="text-[10px] text-neutral-500 truncate mt-0.5">{user?.email}</span>
          </div>
        </div>
        
        {/* dynamic membership batch */}
        <div className="w-fit text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">
          {displayPlan} Member
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR PANEL (Always displays brand and user profiles directly) */}
      <aside className="hidden lg:block border-r border-[#1a1a1a] bg-[#09090b] w-64 shrink-0 h-screen sticky top-0 overflow-hidden">
        {renderSidebarContent()}
      </aside>

      {/* MOBILE TRIGGER BUTTON */}
      <div className="lg:hidden w-fit h-fit self-start shrink-0 p-4">
        <div 
          onClick={() => setIsOpen(true)}
          className="flex items-center bg-[#111112] border border-[#232325] hover:border-neutral-700  rounded-2xl cursor-pointer select-none active:scale-95 transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
            <LayoutSideContent className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE DRAWER OVERLAY (FIXED: Left Side Transition Loop Sync Enabled) */}
      <Drawer 
        isOpen={isOpen} 
        // onOpenChange={(val) => setIsOpen(val)}
        placement="left" 
        size="xs"
      >
        <Drawer.Backdrop className="bg-black/75 backdrop-blur-sm fixed inset-0 z-50" />
        <Drawer.Content 
          className="bg-[#09090b] border-r border-neutral-900 text-white p-0 h-full fixed left-0 top-0 bottom-0 z-50 max-w-3/4 w-full"
        >
          <Drawer.Dialog className="outline-none h-full flex flex-col">
            
            <div className="px-5 py-4 border-b border-neutral-900/60 flex flex-row items-center justify-between w-full bg-[#121214] shrink-0">
              <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Menu Navigation
              </span>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white min-w-8 w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors shrink-0"
              >
                <Xmark className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-hidden">
              {renderSidebarContent(() => setIsOpen(false))}
            </div>

          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}