import React from 'react';
import { MacroType } from '../../types';

interface HeroArcRingProps {
  macro: MacroType;
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const HeroArcRing: React.FC<HeroArcRingProps> = ({ macro, consumed, targets }) => {
  let displayValue: number = 0;
  let displayLabel: string = '';
  let consumedAmount: number = 0;
  let targetAmount: number = 0;
  let unit: string = '';
  let subInfo: string = '';

  if (macro === 'CALORIES') {
    consumedAmount = consumed.calories;
    targetAmount = targets.calories;
    const remaining = Math.max(0, targets.calories - consumed.calories);
    displayValue = remaining;
    displayLabel = 'CALORIES LEFT';
    unit = 'KCAL';
    subInfo = `${consumedAmount.toLocaleString()} / ${targetAmount.toLocaleString()} KCAL`;
  } else if (macro === 'PROTEIN') {
    consumedAmount = consumed.protein;
    targetAmount = targets.protein;
    displayValue = consumed.protein;
    displayLabel = 'PROTEIN (G) LOGGED';
    unit = 'G';
    subInfo = `${consumedAmount} / ${targetAmount}g (${Math.max(0, targetAmount - consumedAmount)}g left)`;
  } else if (macro === 'CARBS') {
    consumedAmount = consumed.carbs;
    targetAmount = targets.carbs;
    displayValue = consumed.carbs;
    displayLabel = 'CARBS (G) LOGGED';
    unit = 'G';
    subInfo = `${consumedAmount} / ${targetAmount}g (${Math.max(0, targetAmount - consumedAmount)}g left)`;
  } else if (macro === 'FAT') {
    consumedAmount = consumed.fat;
    targetAmount = targets.fat;
    displayValue = consumed.fat;
    displayLabel = 'FAT (G) LOGGED';
    unit = 'G';
    subInfo = `${consumedAmount} / ${targetAmount}g (${Math.max(0, targetAmount - consumedAmount)}g left)`;
  }

  // Calculate actual dynamic progress safely clamped between 0 and 1
  const progress = Math.min(1, Math.max(0, consumedAmount / Math.max(1, targetAmount)));

  // Full active stroke span of the 270deg open ring is 540 units (circumference ~722.56)
  // Background track starts at -90 and spans 540 units with gap at bottom.
  // When progress = 0 -> offset = -90 + 540 = 450 (0% filled)
  // When progress = 1 -> offset = -90 (100% filled)
  const strokeDashoffset = -90 + 540 * (1 - progress);

  return (
    <div className="relative flex flex-col items-center justify-center pt-2 pb-2 select-none">
      {/* Soft radial glow */}
      <div className="absolute w-[240px] h-[240px] rounded-full bg-[#C7F464]/10 blur-[50px] pointer-events-none -translate-y-2"></div>

      <div className="relative w-[280px] h-[260px] flex items-center justify-center">
        <svg className="w-[280px] h-[280px] -rotate-90 transform overflow-visible" viewBox="0 0 280 280">
          {/* Background Track Ring */}
          <circle
            cx="140"
            cy="140"
            r="115"
            fill="none"
            stroke="#1F221D"
            strokeWidth="10"
            strokeDasharray="540 722"
            strokeDashoffset="-90"
            strokeLinecap="round"
          />
          {/* Active Dynamic Progress Arc (Reflects actual consumed / target) */}
          <circle
            cx="140"
            cy="140"
            r="115"
            fill="none"
            stroke="#C7F464"
            strokeWidth="10"
            strokeDasharray="540 722"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-3 pointer-events-none">
          <span className="text-[84px] font-headline font-semibold leading-none tracking-[-0.03em] text-[#fafafa]">
            {displayValue}
          </span>
          <span className="text-[10px] tracking-[0.14em] font-mono uppercase text-[#fafafa]/50 mt-1.5 font-medium">
            {displayLabel}
          </span>
          <span className="text-[11px] font-mono text-[#C7F464] mt-1 font-medium bg-[#C7F464]/10 px-2 py-0.5 rounded-full">
            {subInfo}
          </span>
        </div>
      </div>
    </div>
  );
};
