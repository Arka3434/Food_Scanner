import React from 'react';

interface LiquidWaterBandProps {
  waterIntake: number; // e.g. 2.8 L
  goal: number; // e.g. 3.5 L
  onAddWater: (amount: number) => void;
}

export const LiquidWaterBand: React.FC<LiquidWaterBandProps> = ({
  waterIntake,
  goal,
  onAddWater
}) => {
  const percent = Math.min(100, Math.round((waterIntake / Math.max(0.1, goal)) * 100));
  // Invert percent for top positioning or use height
  const waveTopPercent = Math.max(10, 100 - percent);

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] bg-[#1A1C19] p-5 shadow-inner select-none border border-white/[0.04]">
      {/* Liquid Wave Graphic Overlay */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden rounded-b-[28px] transition-all duration-500 ease-out"
        style={{ top: `${waveTopPercent}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#C7F464]/20 via-[#C7F464]/10 to-transparent"></div>
        {/* Wave meniscus curve */}
        <svg
          className="absolute top-0 inset-x-0 w-full h-3 text-[#C7F464]/25 fill-current"
          preserveAspectRatio="none"
          viewBox="0 0 400 12"
        >
          <path d="M0,6 C150,14 250,-2 400,6 L400,12 L0,12 Z"></path>
        </svg>
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-between space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[56px] font-headline font-semibold leading-none tracking-tight text-white">
                {waterIntake.toFixed(1)}
              </span>
              <span className="text-[20px] font-headline font-medium text-white/40">
                L
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-white/40 font-medium">
              OF {goal.toFixed(1)}L GOAL
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#C7F464] border border-white/5">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              water_drop
            </span>
          </div>
        </div>

        {/* Quick Add Pills (Interactive action controls with Blue #4F8CFF feedback) */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onAddWater(0.25)}
            className="flex-1 py-2 rounded-full bg-white/[0.04] active:bg-[#4F8CFF]/25 active:border-[#4F8CFF]/50 transition-all flex items-center justify-center text-white/80 hover:text-white border border-white/[0.06] shadow-sm"
          >
            <span className="text-[11px] font-mono font-medium">+250ml</span>
          </button>
          <button
            type="button"
            onClick={() => onAddWater(0.50)}
            className="flex-1 py-2 rounded-full bg-white/[0.04] active:bg-[#4F8CFF]/25 active:border-[#4F8CFF]/50 transition-all flex items-center justify-center text-white/80 hover:text-white border border-white/[0.06] shadow-sm"
          >
            <span className="text-[11px] font-mono font-medium">+500ml</span>
          </button>
          <button
            type="button"
            onClick={() => onAddWater(0.75)}
            className="flex-1 py-2 rounded-full bg-white/[0.04] active:bg-[#4F8CFF]/25 active:border-[#4F8CFF]/50 transition-all flex items-center justify-center text-white/80 hover:text-white border border-white/[0.06] shadow-sm"
          >
            <span className="text-[11px] font-mono font-medium">+750ml</span>
          </button>
        </div>
      </div>
    </div>
  );
};
