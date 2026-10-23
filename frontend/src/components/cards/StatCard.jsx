// src/components/cards/StatCard.jsx
import React from 'react';

/**
 * Metric KPI card for dashboard overviews.
 */
export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color = 'iris',
}) => {
  const colorMap = {
    iris: {
      bg: 'bg-[#8B7CFF]/10',
      text: 'text-[#8B7CFF]',
      border: 'hover:border-[#8B7CFF]/40',
    },
    cyan: {
      bg: 'bg-[#55D6E8]/10',
      text: 'text-[#55D6E8]',
      border: 'hover:border-[#55D6E8]/40',
    },
    success: {
      bg: 'bg-[#43D9A3]/10',
      text: 'text-[#43D9A3]',
      border: 'hover:border-[#43D9A3]/40',
    },
    warning: {
      bg: 'bg-[#F5C76A]/10',
      text: 'text-[#F5C76A]',
      border: 'hover:border-[#F5C76A]/40',
    },
  };

  const currentTheme = colorMap[color] || colorMap.iris;

  return (
    <div className={`bg-[#151E33] border border-[#26334B] ${currentTheme.border} rounded-2xl p-5 transition-all duration-200 flex items-center justify-between`}>
      <div>
        <p className="text-xs font-medium text-[#7F8BA3] uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-[#F3F5FC] mt-1.5">{value}</p>
        {trend && (
          <p className="text-xs text-[#43D9A3] mt-1 flex items-center gap-1">
            <span>↑</span>
            <span>{trend}</span>
          </p>
        )}
      </div>
      <div className={`p-3.5 rounded-xl ${currentTheme.bg} ${currentTheme.text}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
