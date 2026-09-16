import React from 'react';
import { DayProgressData } from '../../types';

interface ProgressChartProps {
  data: DayProgressData[];
  targetCalories: number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  targetCalories
}) => {
  const maxCalories = Math.max(...data.map(d => d.calories), targetCalories + 300);

  return (
    <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-stitch-card border border-surface-container-high/30">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-headline-sm font-headline font-semibold text-on-surface">
            Calorie Intake vs Target
          </h3>
          <p className="text-body-sm text-outline">
            Daily intake compared to {targetCalories.toLocaleString()} kcal goal
          </p>
        </div>
        <span className="px-space-sm py-1 bg-primary-container/15 text-primary text-label-sm rounded-full font-bold">
          98% Avg
        </span>
      </div>

      {/* Bar Chart Visual */}
      <div className="h-44 flex items-end justify-between gap-space-xs pt-space-md px-space-xs">
        {data.map((item, idx) => {
          const barHeightPercent = Math.min(100, Math.round((item.calories / maxCalories) * 100));
          const isOver = item.calories > targetCalories;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-space-xs h-full justify-end">
              <div 
                className="w-full bg-primary/20 rounded-t-lg relative group flex items-start justify-center pt-1 transition-all duration-500 hover:bg-primary/30"
                style={{ height: `${barHeightPercent}%` }}
              >
                <div 
                  className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-700 ${
                    isOver ? 'bg-secondary' : 'bg-primary'
                  }`}
                  style={{ height: '94%' }}
                />
                <span className="text-[10px] text-on-primary z-10 font-bold hidden sm:inline">
                  {item.calories}
                </span>
              </div>
              <span className="text-label-sm text-outline font-semibold">
                {item.dayShort}
              </span>
            </div>
          );
        })}
      </div>

      {/* Target reference line indicator */}
      <div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-surface-container-high/50">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
          <span>Actual Intake</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-outline inline-block"></span>
          <span>Target ({targetCalories} kcal)</span>
        </div>
      </div>
    </div>
  );
};
