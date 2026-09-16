import React from 'react';

interface GoalSliderProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: number;
  onChange: (newValue: number) => void;
}

export const GoalSlider: React.FC<GoalSliderProps> = ({
  label,
  value,
  unit,
  min,
  max,
  step = 1,
  onChange
}) => {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex justify-between items-center">
        <span className="font-label-md font-medium text-on-surface">{label}</span>
        <span className="font-headline-sm font-headline text-primary font-bold">
          {value.toLocaleString()} <span className="text-body-sm font-normal text-outline">{unit}</span>
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
      />
    </div>
  );
};
