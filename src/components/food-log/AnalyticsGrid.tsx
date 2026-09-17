import React, { useState } from 'react';
import { MOCK_ANALYTICS_STATS } from '../../data/mockData';

export const AnalyticsGrid: React.FC = () => {
  const [period, setPeriod] = useState<'7D' | '30D' | '90D'>('7D');

  return (
    <div className="flex flex-col w-full select-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-headline font-bold tracking-tight text-white">
          Analytics
        </h2>
      </div>

      {/* Period Pills */}
      <div className="flex items-center gap-2 mb-6">
        {(['7D', '30D', '90D'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-full text-xs font-headline font-semibold transition-all ${
              period === p
                ? 'bg-[#34d399] text-[#001a12] shadow-sm'
                : 'bg-[#18181b] text-[#a1a1aa] hover:bg-[#27272a]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 2x2 Stat Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Stat 1: Avg Calories */}
        <div className="bg-[#121215] p-4 rounded-xl flex flex-col justify-between border border-white/[0.04]">
          <span className="text-[10px] font-headline uppercase tracking-[0.1em] text-[#a1a1aa]/60">
            Avg Calories
          </span>
          <div className="my-2">
            <span className="text-2xl font-headline font-bold text-white tracking-tight">
              {MOCK_ANALYTICS_STATS.avgCalories}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#ef4444]">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            <span>{MOCK_ANALYTICS_STATS.caloriesTrend}</span>
          </div>
        </div>

        {/* Stat 2: Avg Protein */}
        <div className="bg-[#121215] p-4 rounded-xl flex flex-col justify-between border border-white/[0.04]">
          <span className="text-[10px] font-headline uppercase tracking-[0.1em] text-[#a1a1aa]/60">
            Avg Protein
          </span>
          <div className="my-2">
            <span className="text-2xl font-headline font-bold text-white tracking-tight">
              {MOCK_ANALYTICS_STATS.avgProtein}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#34d399]">
            <span className="material-symbols-outlined text-[14px]">check</span>
            <span>{MOCK_ANALYTICS_STATS.proteinStatus}</span>
          </div>
        </div>

        {/* Stat 3: Avg Carbs */}
        <div className="bg-[#121215] p-4 rounded-xl flex flex-col justify-between border border-white/[0.04]">
          <span className="text-[10px] font-headline uppercase tracking-[0.1em] text-[#a1a1aa]/60">
            Avg Carbs
          </span>
          <div className="my-2">
            <span className="text-2xl font-headline font-bold text-white tracking-tight">
              {MOCK_ANALYTICS_STATS.avgCarbs}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#a1a1aa]/60">
            <span className="material-symbols-outlined text-[14px]">remove</span>
            <span>{MOCK_ANALYTICS_STATS.carbsStatus}</span>
          </div>
        </div>

        {/* Stat 4: Avg Fat */}
        <div className="bg-[#121215] p-4 rounded-xl flex flex-col justify-between border border-white/[0.04]">
          <span className="text-[10px] font-headline uppercase tracking-[0.1em] text-[#a1a1aa]/60">
            Avg Fat
          </span>
          <div className="my-2">
            <span className="text-2xl font-headline font-bold text-white tracking-tight">
              {MOCK_ANALYTICS_STATS.avgFat}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#34d399]">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            <span>{MOCK_ANALYTICS_STATS.fatStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
