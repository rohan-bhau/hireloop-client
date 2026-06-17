import React from 'react';
import PricingContainer from './PricingContainer';

// Kept completely as a Server Component for clean SEO rendering
const PricingPage = async () => {
  return (
    <div className="min-h-screen mt-10 bg-[#0a0a0a] text-white py-16 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        
        {/* Static Header Elements rendered directly on the server */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-semibold block mb-3">
            ▪ Flexible Membership Tiers ▪
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 tracking-tight">
            Predictable pricing,<br />built for your next step
          </h1>
          <p className="text-neutral-500 text-sm mt-4 max-w-md mx-auto">
            Select the plan matching your current career path or organizational talent acquisition requirements.
          </p>
        </div>

        {/* Client-Side container logic handles the state mapping below */}
        <PricingContainer />

      </div>
    </div>
  );
};

export default PricingPage;