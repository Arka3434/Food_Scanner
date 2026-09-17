import React, { useState } from 'react';
import { useNutrition } from '../../context/NutritionContext';

export const DailyIntakeChart: React.FC = () => {
  const { consumed, targets } = useNutrition();
  const [metric, setMetric] = useState<'Calories' | 'Protein'>('Calories');

  // Format today's current day intake from NutritionContext
  const currentDayCalStr = consumed.calories >= 1000 
    ? `${(consumed.calories / 1000).toFixed(1)}k` 
    : `${consumed.calories}`;
  const currentDayCalHeight = `${Math.min(100, Math.max(10, Math.round((consumed.calories / Math.max(1, targets.calories)) * 100)))}%`;

  const currentDayProtStr = `${consumed.protein}g`;
  const currentDayProtHeight = `${Math.min(100, Math.max(10, Math.round((consumed.protein / Math.max(1, targets.protein)) * 100)))}%`;

  const chartData = metric === 'Calories' ? [
    { day: 'M', val: '2.1k', height: '76%' },
    { day: 'T', val: '2.3k', height: '84%' },
    { day: 'W', val: currentDayCalStr, height: currentDayCalHeight, isCurrent: true },
    { day: 'T', val: '2.0k', height: '74%' },
    { day: 'F', val: '1.6k', height: '60%' },
    { day: 'S', val: '2.2k', height: '80%' },
    { day: 'S', val: '1.8k', height: '65%' }
  ] : [
    { day: 'M', val: '142g', height: '78%' },
    { day: 'T', val: '154g', height: '85%' },
    { day: 'W', val: currentDayProtStr, height: currentDayProtHeight, isCurrent: true },
    { day: 'T', val: '148g', height: '80%' },
    { day: 'F', val: '120g', height: '65%' },
    { day: 'S', val: '150g', height: '82%' },
    { day: 'S', val: '135g', height: '72%' }
  ];

  return (
    <div className="bg-[#121215] p-4 rounded-xl border border-white/[0.04] select-none">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-headline uppercase tracking-[0.1em] text-[#a1a1aa]/60 font-semibold">
          DAILY INTAKE
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-headline font-semibold bg-[#065f46] text-[#bbf7d0]">
          98% Avg
        </span>
      </div>

      {/* Toggle Pills (Interactive controls in Blue #4F8CFF) */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMetric('Calories')}
          className={`px-3.5 py-1 rounded-full text-xs font-headline font-semibold transition-all ${
            metric === 'Calories'
              ? 'bg-[#4F8CFF] text-white shadow-md'
              : 'bg-[#18181b] text-[#a1a1aa]/70 hover:text-white'
          }`}
        >
          Calories
        </button>
        <button
          type="button"
          onClick={() => setMetric('Protein')}
          className={`px-3.5 py-1 rounded-full text-xs font-headline font-semibold transition-all ${
            metric === 'Protein'
              ? 'bg-[#4F8CFF] text-white shadow-md'
              : 'bg-[#18181b] text-[#a1a1aa]/70 hover:text-white'
          }`}
        >
          Protein
        </button>
      </div>

      {/* Chart Visual */}
      <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-1">
        {chartData.map((col, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className={`text-[11px] font-headline font-bold font-mono ${col.isCurrent ? 'text-[#C7F464]' : 'text-white'}`}>
              {col.val}
            </span>
            <div className="w-full relative h-28 flex flex-col justify-end items-center">
              {/* Background Track */}
              <div className="absolute inset-x-0 bottom-0 h-full rounded-t-xl rounded-b-lg pointer-events-none bg-white/[0.08]"></div>
              {/* Active Gradient Bar */}
              <div
                className={`w-full rounded-t-xl rounded-b-lg relative shadow-lg transition-all duration-300 ${
                  col.isCurrent
                    ? 'bg-gradient-to-t from-[#4F8CFF] via-[#38BDF8] to-[#C7F464]'
                    : 'bg-gradient-to-t from-blue-700 via-indigo-600 to-cyan-400'
                }`}
                style={{ height: col.height }}
              >
                <div className="absolute inset-y-0 left-0.5 w-1/3 bg-white/20 rounded-l-xl"></div>
              </div>
            </div>
            <span className={`text-[10px] font-headline uppercase ${col.isCurrent ? 'text-[#C7F464] font-bold' : 'text-[#a1a1aa]'}`}>
              {col.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
