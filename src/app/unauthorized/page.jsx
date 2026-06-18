import React from 'react';
import Link from 'next/link';
import { Button, Card } from '@heroui/react';
import { ArrowLeft, Shield } from '@gravity-ui/icons';
import { LuLock } from 'react-icons/lu';
import { BiHelpCircle } from 'react-icons/bi';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Ambient Red/Crimson Background Warning Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-48 bg-rose-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Main Error Card */}
        <Card className="bg-[#121212] border border-[#232323] p-8 rounded-3xl text-center flex flex-col items-center gap-6 shadow-2xl shadow-rose-950/5">
          
          {/* Lock / Shield Danger Indicator Badge */}
          <div className="w-16 h-16 rounded-full bg-rose-950/30 border border-rose-500/20 flex items-center justify-center text-rose-400 relative">
            <LuLock className="w-6 h-6 absolute animate-pulse opacity-40 text-rose-500" />
            <Shield className="w-6 h-6 relative z-10" />
          </div>

          {/* Error Message Header */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-rose-400 font-bold block mb-2 font-mono">
              Error 403 • Restricted Area
            </span>
            <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
              Access Denied
            </h1>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed font-light">
              Your account current credentials or plan membership level don't grant permissions to view this endpoint workspace.
            </p>
          </div>

          {/* Bulleted Context Warning Rules Checklist */}
          <div className="w-full bg-[#161616] border border-[#222222] rounded-2xl p-4 text-left flex flex-col gap-2.5 text-xs text-neutral-400 font-light">
            <p className="font-semibold text-neutral-300 mb-1">Why am I seeing this?</p>
            <div className="flex items-start gap-2">
              <span className="text-rose-500 font-bold mt-0.5">•</span>
              <span>You signed in using a role (Seeker/Recruiter) misaligned with this panel tool.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-500 font-bold mt-0.5">•</span>
              <span>Your current active monthly subscription credit tier needs an upgrade plan.</span>
            </div>
          </div>

          {/* Support Helpline Banner */}
          <div className="flex items-start gap-2.5 bg-neutral-900/60 border border-neutral-800 p-3.5 rounded-xl text-left w-full">
            <BiHelpCircle  className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-neutral-500 leading-normal font-light">
              Think this is an operational bug? Log out and access via your verified profile dashboard or reach our systems desk at{' '}
              <a href="mailto:support@hireloop.com" className="text-neutral-400 font-medium hover:underline transition-all">
                support@hireloop.com
              </a>.
            </p>
          </div>

          {/* Action Strategy Grid Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-900">
            <Link href="/" >
              <Button className="w-full font-bold bg-[#1a1a1a] border border-[#262626] text-neutral-300 hover:bg-neutral-800 rounded-xl py-5 text-xs transition-colors flex items-center justify-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Back Home
              </Button>
            </Link>

            <Link href="/plans">
              <Button className="w-full font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl py-5 text-xs shadow-md shadow-purple-950/20 hover:opacity-95 transition-opacity">
                View Upgrades
              </Button>
            </Link>
          </div>

        </Card>

      </div>
    </div>
  );
}