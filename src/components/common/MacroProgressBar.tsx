import React from 'react';

interface MacroProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  colorVariant?: 'protein' | 'carbs' | 'fat';
}

export const MacroProgressBar: React.FC<MacroProgressBarProps> = ({
  label,
  current,
  target,
  unit = 'g',
  colorVariant = 'protein'
}) => {
  const percentage = Math.min(100, Math.round((current / (target || 1)) * 100));

  const getMultiplier = () => {
    switch (colorVariant) {
      case 'fat': return 9;
      default: return 4;
    }
  };

  const kcal = Math.round(current * getMultiplier());

  const getFillColor = () => {
    switch (colorVariant) {
      case 'protein': return 'bg-primary';
      case 'carbs': return 'bg-secondary';
      case 'fat': return 'bg-tertiary-container';
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-stitch-card border border-surface-container-high/40 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-space-xs">
        <span className="text-label-md font-medium text-on-surface">{label}</span>
        <span className="text-label-sm text-outline font-medium">
          {current} / {target}{unit}
        </span>
      </div>

      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mb-space-xs">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getFillColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-body-sm text-outline">
        {kcal} kcal · {percentage}%
      </span>
    </div>
  );
};
