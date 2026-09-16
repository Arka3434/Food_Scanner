import React from 'react';

interface ServingStepperProps {
  value: number;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
}

export const ServingStepper: React.FC<ServingStepperProps> = ({
  value,
  unit = 'serving',
  min = 1,
  max = 20,
  step = 1,
  onChange
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(Number((value - step).toFixed(1)));
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(Number((value + step).toFixed(1)));
    }
  };

  return (
    <div className="flex items-center gap-2 bg-surface px-2.5 py-1 rounded-lg border border-surface-container-high/60 shadow-sm">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="text-outline hover:text-on-surface font-bold px-1.5 py-0.5 rounded transition-colors disabled:opacity-40"
        title="Decrease serving"
      >
        -
      </button>

      <span className="text-on-surface font-semibold text-label-md min-w-[20px] text-center">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="text-outline hover:text-on-surface font-bold px-1.5 py-0.5 rounded transition-colors disabled:opacity-40"
        title="Increase serving"
      >
        +
      </button>

      {unit && <span className="text-outline text-label-sm ml-0.5">{unit}</span>}
    </div>
  );
};
