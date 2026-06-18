import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { Button, Card } from '@heroui/react'
import {  ArrowRight } from '@gravity-ui/icons'
import { LuMail, LuReceipt, LuSparkles,  LuCircleCheckBig } from 'react-icons/lu'
import { FiHelpCircle } from 'react-icons/fi'
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // Retrieve data from stripe session
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, amount_total, currency, metadata } = session
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  // Format amount safely for display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(amount_total / 100)

    if (status === 'complete') {
      
        const subsInfo = {
            email: customerEmail,
            planId: metadata.planId
        }

        const result = await createSubscription(subsInfo)
        console.log(result)

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Decorative Ambient Background Top-Light Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 blur-[80px] pointer-events-none" />

        <div className="max-w-xl w-full relative z-10">
          
          {/* Main Success Container */}
          <Card className="bg-[#121212] border border-[#232323] p-8 rounded-3xl text-center flex flex-col items-center gap-6 shadow-2xl shadow-emerald-950/5">
            
            {/* Animated Radar Success Circle */}
            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/5 opacity-40"></span>
              <LuCircleCheckBig  className="w-7 h-7" />
            </div>

            {/* Typography Heading Block */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold block mb-2">
                Payment Received
              </span>
              <h1 className="text-3xl font-extrabold text-neutral-100 tracking-tight">
                Thank you for your order!
              </h1>
              <p className="text-neutral-400 text-sm mt-3 leading-relaxed font-light px-2">
                Your transaction processed successfully. Your account tier upgrades are currently online.
              </p>
            </div>

            {/* Quick Transaction Manifest Ledger */}
            <div className="w-full bg-[#161616] border border-[#222222] rounded-2xl p-4 flex flex-col gap-3.5 text-left text-sm mt-2">
              <div className="flex justify-between items-center pb-2.5 border-b border-neutral-800/60">
                <span className="text-neutral-500 font-medium flex items-center gap-2">
                  <LuReceipt className="w-4 h-4 text-purple-400" /> Amount Charged
                </span>
                <span className="text-neutral-100 font-bold font-mono text-base">
                  {formattedAmount}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-neutral-500 font-medium flex items-center gap-2 mt-0.5">
                  <LuMail className="w-4 h-4 text-purple-400" /> Confirmation Link
                </span>
                <span className="text-neutral-300 font-medium max-w-[240px] truncate text-right text-xs">
                  {customerEmail}
                </span>
              </div>
            </div>

            {/* Secondary Help Notification Info Footer */}
            <div className="flex items-start gap-2.5 bg-purple-950/20 border border-purple-900/30 p-3.5 rounded-xl text-left w-full mt-1">
              <FiHelpCircle  className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
              <p className="text-xs text-neutral-400 leading-normal font-light">
                Have questions regarding custom billing snapshots? Reach out to us via{' '}
                <a href="mailto:orders@example.com" className="text-purple-400 font-medium hover:underline transition-all">
                  orders@example.com
                </a>
              </p>
            </div>

            {/* Navigation Action Buttons Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-900">
              <Link href="/dashboard" >
                <Button className="w-full font-bold bg-[#1a1a1a] border border-[#262626] text-neutral-300 hover:bg-neutral-800 rounded-xl py-5 text-xs transition-colors">
                  Go To Dashboard
                </Button>
              </Link>

              <Link href="/jobs" >
                <Button className="w-full font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl py-5 text-xs shadow-md shadow-purple-950/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5">
                  Explore Positions <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

          </Card>

        </div>
      </div>
    )
  }
}