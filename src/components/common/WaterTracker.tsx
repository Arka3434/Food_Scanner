import React from 'react';
import { useNutrition } from '../../context/NutritionContext';

export const WaterTracker: React.FC = () => {
  const { waterIntake, targets, addWater } = useNutrition();

  const currentLiters = (waterIntake / 1000).toFixed(1);
  const targetLiters = (targets.water / 1000).toFixed(1);
  const percentage = Math.min(100, Math.round((waterIntake / targets.water) * 100));

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-stitch-card border border-surface-container-high/40 flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-on-secondary-container flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">water_drop</span>
          </div>
          <div>
            <h4 className="text-label-md text-on-surface font-semibold">Log Water Intake</h4>
            <p className="text-body-sm text-outline">
              {currentLiters}L / {targetLiters}L ({percentage}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => addWater(250)}
            className="px-space-md py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-full text-label-sm font-medium transition-colors"
          >
            +250ml
          </button>
          <button
            type="button"
            onClick={() => addWater(500)}
            className="px-space-md py-1.5 bg-primary text-on-primary hover:bg-primary-container rounded-full text-label-sm font-medium shadow-sm transition-colors"
          >
            +500ml
          </button>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-1">
        <div 
          className="bg-secondary h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
