// src/components/ui/LoadingSkeleton.jsx
import React from 'react';

/**
 * Placeholder pulsing skeleton components for loading states.
 */
export const CardSkeleton = () => (
  <div className="bg-[#151E33] border border-[#26334B] rounded-xl p-5 animate-pulse space-y-4">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-[#1C2742] rounded-full" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-[#1C2742] rounded w-1/3" />
        <div className="h-3 bg-[#1C2742] rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2 pt-2">
      <div className="h-3 bg-[#1C2742] rounded w-5/6" />
      <div className="h-3 bg-[#1C2742] rounded w-4/6" />
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-6 w-16 bg-[#1C2742] rounded-full" />
      <div className="h-6 w-14 bg-[#1C2742] rounded-full" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-[#151E33] border border-[#26334B] rounded-xl p-4 animate-pulse space-y-3">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center justify-between py-2 border-b border-[#26334B]/50 last:border-none">
        <div className="flex items-center space-x-3 w-1/3">
          <div className="w-8 h-8 bg-[#1C2742] rounded-full" />
          <div className="h-3 bg-[#1C2742] rounded w-2/3" />
        </div>
        <div className="h-3 bg-[#1C2742] rounded w-1/4" />
        <div className="h-3 bg-[#1C2742] rounded w-16" />
      </div>
    ))}
  </div>
);
