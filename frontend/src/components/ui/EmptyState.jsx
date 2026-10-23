// src/components/ui/EmptyState.jsx
import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

/**
 * Empty state view shown when searches yield 0 results or lists are empty.
 */
export const EmptyState = ({
  icon: Icon = SearchX,
  title = "No results found",
  description = "Try adjusting your search criteria, clearing your filters, or check back later.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#151E33]/40 border border-[#26334B] rounded-2xl my-4">
      <div className="p-4 bg-[#1C2742] rounded-2xl text-[#8B7CFF] mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-semibold text-[#F3F5FC] mb-1.5">{title}</h4>
      <p className="text-xs text-[#A7B2C8] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
