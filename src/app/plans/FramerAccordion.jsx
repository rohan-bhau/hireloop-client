"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from '@gravity-ui/icons';

export default function FramerAccordion() {
  // Store the active index of the open FAQ item (null if all collapsed)
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { q: "Can I cancel my plan membership anytime?", a: "Yes, you can completely cancel or downgrade your subscription tier at any point directly inside your account profile dashboard settings. You will retain pro permissions until the end of your billing date cycle." },
    { q: "How do subscription refunds work?", a: "We offer a 14-day window for transactions if tokens or post actions haven't been utilized heavily yet. Reach out to support to process an evaluation snapshot safely." },
    { q: "What payment methods do you accept?", a: "We securely process all transactions via Stripe infrastructure, allowing payment processing across major worldwide credit/debit options, Apple Pay, and Google Wallet tokens." },
    { q: "What happens to my application histories when switching plans?", a: "Your history, tracking routes, and resume tokens remain preserved inside the database workspace securely. Downgrading strictly pauses additional submission limits for future cycles without erasing data." }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto border-t border-neutral-900 pt-16 w-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-neutral-200 tracking-tight">Frequently Asked Questions</h2>
        <p className="text-xs text-neutral-500 mt-1">Got questions about application usage rules? We've got answers.</p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          
          return (
            <div 
              key={idx} 
              className="bg-[#121212] border border-[#232323] rounded-xl overflow-hidden transition-colors duration-200"
            >
              {/* Question Click Anchor */}
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-neutral-200 hover:text-white transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="text-neutral-500 flex items-center justify-center shrink-0 ml-4"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              {/* Smooth Expanding Framer Motion Wrapper */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs text-neutral-400 font-light leading-relaxed border-t border-neutral-900/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}