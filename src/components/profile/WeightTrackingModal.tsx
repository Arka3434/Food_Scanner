import React, { useState } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { WeightEntry } from '../../types';

interface WeightTrackingModalProps {
  onClose: () => void;
}

export const WeightTrackingModal: React.FC<WeightTrackingModalProps> = ({ onClose }) => {
  const { userProfile, weightHistory, addWeightEntry, deleteWeightEntry } = useNutrition();

  const [inputWeight, setInputWeight] = useState<string>(userProfile.weight.toString());
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [inputNote, setInputNote] = useState<string>('');

  const isImperial = userProfile.unit === 'imperial';
  const unitLabel = isImperial ? 'lb' : 'kg';

  // Sort history chronologically for graph plotting
  const sortedHistory = [...weightHistory].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const currentWeight = userProfile.weight;

  // Compute min/max for SVG graph
  const weights = sortedHistory.map((e) => e.weight);
  const minWeight = weights.length > 0 ? Math.floor(Math.min(...weights) - 1) : 60;
  const maxWeight = weights.length > 0 ? Math.ceil(Math.max(...weights) + 1) : 80;
  const range = Math.max(1, maxWeight - minWeight);

  // SVG dimensions
  const svgWidth = 320;
  const svgHeight = 120;
  const paddingX = 20;
  const paddingY = 20;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const points = sortedHistory.map((entry, index) => {
    const x =
      sortedHistory.length > 1
        ? paddingX + (index / (sortedHistory.length - 1)) * chartWidth
        : svgWidth / 2;
    const y =
      svgHeight -
      paddingY -
      ((entry.weight - minWeight) / range) * chartHeight;
    return { x, y, entry };
  });

  const pathD =
    points.length > 1
      ? points.reduce(
          (acc, pt, i) =>
            i === 0
              ? `M ${pt.x},${pt.y}`
              : `${acc} L ${pt.x},${pt.y}`,
          ''
        )
      : points.length === 1
      ? `M ${points[0].x - 20},${points[0].y} L ${points[0].x + 20},${points[0].y}`
      : '';

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputWeight);
    if (!isNaN(val) && val > 0) {
      addWeightEntry(val, inputDate, inputNote.trim() || undefined);
      setInputNote('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col justify-end p-4 select-none">
      <div className="bg-[#18181b] border border-white/10 rounded-2xl p-6 shadow-2xl max-w-md mx-auto w-full max-h-[88vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4F8CFF] text-2xl">
              monitor_weight
            </span>
            <h3 className="font-headline font-bold text-white text-lg">
              Weight Tracking
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Current Weight Callout */}
        <div className="flex items-baseline justify-between p-4 bg-[#121215] rounded-xl border border-white/5 mb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#a1a1aa] block">
              Current Weight
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-headline font-bold text-white">
                {currentWeight}
              </span>
              <span className="text-sm font-mono text-[#a1a1aa]">{unitLabel}</span>
            </div>
          </div>
          {sortedHistory.length >= 2 && (
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#a1a1aa] block">
                Total Change
              </span>
              <span className="text-xs font-mono font-semibold text-[#C7F464] mt-1 inline-block bg-[#C7F464]/10 px-2 py-0.5 rounded">
                {(currentWeight - sortedHistory[0].weight).toFixed(1)} {unitLabel}
              </span>
            </div>
          )}
        </div>

        {/* Real Dynamic SVG Graph */}
        <div className="bg-[#121215] p-3 rounded-xl border border-white/5 mb-4 flex flex-col">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#a1a1aa] px-1 mb-1">
            <span>Progress Trend (Local)</span>
            <span>{maxWeight} {unitLabel}</span>
          </div>

          <div className="w-full h-[120px] relative flex items-center justify-center">
            {points.length > 0 ? (
              <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Horizontal reference grid line */}
                <line
                  x1={paddingX}
                  y1={svgHeight - paddingY}
                  x2={svgWidth - paddingX}
                  y2={svgHeight - paddingY}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
                <line
                  x1={paddingX}
                  y1={paddingY}
                  x2={svgWidth - paddingX}
                  y2={paddingY}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />

                {/* Main Curve Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#4F8CFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Entry Dots */}
                {points.map((pt, i) => (
                  <g key={i}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill="#121215"
                      stroke="#4F8CFF"
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </svg>
            ) : (
              <span className="text-xs text-white/40 font-mono">No entries logged yet</span>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[#a1a1aa] px-1 mt-1">
            <span>{sortedHistory[0]?.date || 'Start'}</span>
            <span>{minWeight} {unitLabel}</span>
            <span>{sortedHistory[sortedHistory.length - 1]?.date || 'Today'}</span>
          </div>
        </div>

        {/* Add Entry Form (Blue #4F8CFF Action) */}
        <form onSubmit={handleAddEntry} className="bg-[#121215] p-3 rounded-xl border border-white/5 mb-4 flex flex-col gap-2.5">
          <span className="text-xs font-headline font-semibold text-white">
            Log New Weight
          </span>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-[#a1a1aa] font-mono block mb-1">
                Weight ({unitLabel})
              </label>
              <input
                type="number"
                step="0.1"
                value={inputWeight}
                onChange={(e) => setInputWeight(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 text-white font-mono text-sm border border-white/10 focus:border-[#4F8CFF] focus:outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-[#a1a1aa] font-mono block mb-1">
                Date
              </label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 text-white font-mono text-xs border border-white/10 focus:border-[#4F8CFF] focus:outline-none"
                required
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Note (e.g. Morning fasted)"
            value={inputNote}
            onChange={(e) => setInputNote(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-black/40 text-white text-xs border border-white/10 focus:border-[#4F8CFF] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#4F8CFF] text-white font-headline font-semibold text-xs shadow-md active:scale-95 transition-transform"
          >
            + Add Weight Entry
          </button>
        </form>

        {/* Historical Entries List */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]">
            Entry History ({weightHistory.length})
          </span>
          <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
            {weightHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#121215] border border-white/5 font-mono text-xs"
              >
                <div>
                  <span className="text-white font-bold mr-2">
                    {item.weight} {unitLabel}
                  </span>
                  <span className="text-[#a1a1aa] text-[11px]">{item.date}</span>
                  {item.note && (
                    <span className="block text-[10px] text-[#a1a1aa]/70 font-normal">
                      {item.note}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  title="Delete entry"
                  onClick={() => deleteWeightEntry(item.id)}
                  className="size-6 rounded-full bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
