import React from 'react';

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export const FilterPill: React.FC<FilterPillProps> = ({
  label,
  isActive,
  onClick,
  count
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-label-md font-medium whitespace-nowrap transition-all duration-200 ${
        isActive
          ? 'bg-primary text-on-primary shadow-sm'
          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
          isActive ? 'bg-white/20 text-white' : 'bg-surface-container-high text-outline'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};
