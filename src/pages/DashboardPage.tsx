import React from 'react';
import { useNutrition } from '../context/NutritionContext';
import { HeroArcRing } from '../components/dashboard/HeroArcRing';
import { MacroRowSelector } from '../components/dashboard/MacroRowSelector';
import { LiquidWaterBand } from '../components/dashboard/LiquidWaterBand';
import { TodaysMeals } from '../components/dashboard/TodaysMeals';

export const DashboardPage: React.FC = () => {
  const {
    targets,
    meals,
    waterIntake,
    streak,
    selectedMacro,
    setSelectedMacro,
    consumed,
    addWater
  } = useNutrition();

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 space-y-6 select-none bg-[#0E0F0D] rounded-3xl min-h-screen">
      {/* Top Bar Stats */}
      <div className="flex items-center justify-between px-1 pt-1">
        <span className="text-[13px] font-mono tracking-tight font-medium text-white/50 uppercase">
          Wed 16
        </span>
        <div className="flex items-center gap-1 bg-[#1A1C19] px-2.5 py-1 rounded-full border border-white/[0.04]">
          <span
            className="material-symbols-outlined text-[16px] text-[#C7F464]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-[13px] font-mono font-semibold text-[#C7F464]">
            {streak}
          </span>
        </div>
      </div>

      {/* Hero Interactive Arc Ring */}
      <HeroArcRing
        macro={selectedMacro}
        consumed={consumed}
        targets={targets}
      />

      {/* Mutually Exclusive Macro Rows Selector */}
      <MacroRowSelector
        selectedMacro={selectedMacro}
        onSelect={setSelectedMacro}
        consumed={consumed}
        targets={targets}
      />

      {/* Water Tracking Full-Width Band */}
      <LiquidWaterBand
        waterIntake={waterIntake}
        goal={targets.water}
        onAddWater={addWater}
      />

      {/* Today's Meals Section */}
      <TodaysMeals meals={meals} />
    </div>
  );
};
