import React from 'react';

interface CalorieProgressRingProps {
  consumed: number;
  target: number;
  size?: number;
}

export const CalorieProgressRing: React.FC<CalorieProgressRingProps> = ({
  consumed,
  target,
  size = 160
}) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const percentage = Math.min(100, Math.max(0, Math.round((consumed / target) * 100)));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        {/* Background track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          className="text-surface-container"
        />
        {/* Animated Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Central Metric Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="font-headline text-headline-sm font-bold text-on-surface">
          {consumed.toLocaleString()}
        </span>
        <span className="text-body-sm text-outline font-medium">
          / {target.toLocaleString()} kcal
        </span>
      </div>
    </div>
  );
};
