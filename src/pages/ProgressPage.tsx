import React, { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import { ProgressChart } from '../components/common/ProgressChart';
import { MetricCard } from '../components/common/MetricCard';
import { MOCK_PROGRESS_7D } from '../data/mockData';

export const ProgressPage: React.FC = () => {
  const { targets } = useNutrition();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="flex flex-col gap-space-lg pb-12">
      {/* Time Range Selector (Matching Stitch Screen 04) */}
      <div className="flex bg-surface-container-low p-1 rounded-xl border border-surface-container-high/40">
        <button
          type="button"
          onClick={() => setTimeRange('7d')}
          className={`flex-1 py-2 text-label-md font-semibold rounded-lg transition-all ${
            timeRange === '7d'
              ? 'bg-surface text-on-surface shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          7 Days
        </button>
        <button
          type="button"
          onClick={() => setTimeRange('30d')}
          className={`flex-1 py-2 text-label-md font-semibold rounded-lg transition-all ${
            timeRange === '30d'
              ? 'bg-surface text-on-surface shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          30 Days
        </button>
        <button
          type="button"
          onClick={() => setTimeRange('90d')}
          className={`flex-1 py-2 text-label-md font-semibold rounded-lg transition-all ${
            timeRange === '90d'
              ? 'bg-surface text-on-surface shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          90 Days
        </button>
      </div>

      {/* Weekly Average Summary Cards - Bento Grid (Matching Stitch Screen 04) */}
      <div className="grid grid-cols-2 gap-space-md">
        <MetricCard
          label="Avg Calories"
          value="2,050"
          unit="kcal/day"
          statusText="-4% vs target"
          statusType="success"
          icon="local_fire_department"
          iconBg="bg-primary-container/20"
          iconColor="text-primary"
        />

        <MetricCard
          label="Avg Protein"
          value="145"
          unit="g/day"
          statusText="Goal met (140g)"
          statusType="success"
          icon="fitness_center"
          iconBg="bg-primary-container/20"
          iconColor="text-primary"
        />

        <MetricCard
          label="Avg Carbs"
          value="210"
          unit="g/day"
          statusText="On track"
          statusType="neutral"
          icon="grain"
          iconBg="bg-tertiary-fixed/40"
          iconColor="text-tertiary"
        />

        <MetricCard
          label="Avg Fat"
          value="62"
          unit="g/day"
          statusText="Optimal range"
          statusType="success"
          icon="oil_barrel"
          iconBg="bg-tertiary-fixed/40"
          iconColor="text-tertiary"
        />
      </div>

      {/* Calorie Intake vs Target Chart Card (Matching Stitch Screen 04) */}
      <ProgressChart
        data={MOCK_PROGRESS_7D}
        targetCalories={targets.calories}
      />

      {/* Macronutrient Distribution Split */}
      <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-stitch-card border border-surface-container-high/30">
        <div className="flex items-center justify-between">
          <h3 className="text-headline-sm font-headline font-semibold text-on-surface">
            Macro Distribution
          </h3>
          <span className="text-label-sm text-outline">Past {timeRange}</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
            <div className="bg-primary h-full" style={{ width: '30%' }} title="Protein 30%" />
            <div className="bg-secondary h-full" style={{ width: '47%' }} title="Carbs 47%" />
            <div className="bg-tertiary-container h-full" style={{ width: '23%' }} title="Fat 23%" />
          </div>

          <div className="flex justify-between items-center text-xs text-outline font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span>Protein (30%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span>Carbs (47%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />
              <span>Fat (23%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Trend Card */}
      <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-stitch-card border border-surface-container-high/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-headline-sm font-headline font-semibold text-on-surface">
              Weight Trajectory
            </h3>
            <p className="text-body-sm text-outline">Trending towards 68.0 kg target</p>
          </div>
          <span className="px-space-sm py-1 bg-primary-container/15 text-primary text-label-sm rounded-full font-bold">
            -1.4 kg
          </span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-headline-lg font-headline font-bold text-on-surface">
            68.2 <span className="text-body-md font-normal text-outline">kg</span>
          </span>
          <span className="text-label-sm text-primary font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[16px]">trending_down</span>
            Down 0.3 kg this week
          </span>
        </div>
      </div>

      {/* Hydration Adherence Card */}
      <div className="bg-surface-container-low p-space-lg rounded-xl flex items-center justify-between shadow-stitch-card border border-surface-container-high/30">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-on-secondary-container flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">water_drop</span>
          </div>
          <div>
            <h4 className="text-label-md font-semibold text-on-surface">Hydration Consistency</h4>
            <p className="text-body-sm text-outline">Average 2.4L / day (96% adherence)</p>
          </div>
        </div>
        <span className="text-label-md font-bold text-primary">6 of 7 days</span>
      </div>
    </div>
  );
};
