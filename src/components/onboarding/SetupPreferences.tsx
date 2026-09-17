import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../../context/NutritionContext';
import { ActivityLevel } from '../../types';

interface LevelConfig {
  title: ActivityLevel;
  freq: string;
}

const LEVELS: LevelConfig[] = [
  { title: 'Sedentary', freq: 'Little to no exercise' },
  { title: 'Light', freq: '1-2 days / week' },
  { title: 'Moderate', freq: '3-5 days / week' },
  { title: 'Active', freq: '6-7 days / week' },
  { title: 'Athlete', freq: 'Twice a day' }
];

const THUMB_POSITIONS: Record<number, string> = {
  4: '2%',
  3: '24%',
  2: '48%',
  1: '70%',
  0: '91%'
};

const DEFAULT_DIET_CHIPS = [
  'Vegetarian',
  'Vegan',
  'Halal',
  'Dairy-free',
  'Gluten-free',
  'Nut allergy',
  'Shellfish',
  'Egg',
  'Soy',
  'No restrictions'
];

export const SetupPreferences: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useNutrition();

  const [activeIndex, setActiveIndex] = useState<number>(3); // Default 'Active'
  const [selectedChips, setSelectedChips] = useState<string[]>(['Vegetarian', 'Dairy-free']);
  const [allChips, setAllChips] = useState<string[]>(DEFAULT_DIET_CHIPS);

  const toggleChip = (chip: string) => {
    if (chip === 'No restrictions') {
      setSelectedChips(['No restrictions']);
      return;
    }

    setSelectedChips((prev) => {
      const filtered = prev.filter((c) => c !== 'No restrictions');
      if (filtered.includes(chip)) {
        return filtered.filter((c) => c !== chip);
      } else {
        return [...filtered, chip];
      }
    });
  };

  const handleAddCustomChip = () => {
    const custom = window.prompt('Add personal preference or allergy:');
    if (custom && custom.trim()) {
      const trimmed = custom.trim();
      if (!allChips.includes(trimmed)) {
        setAllChips((prev) => [...prev, trimmed]);
      }
      setSelectedChips((prev) => [...prev.filter((c) => c !== 'No restrictions'), trimmed]);
    }
  };

  const handleComplete = () => {
    completeOnboarding({
      activityLevel: LEVELS[activeIndex].title,
      dietaryPreferences: selectedChips
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col justify-between px-6 pt-6 pb-8 select-none max-w-md mx-auto">
      {/* Top Segmented Stepper Bar */}
      <div className="flex items-center gap-2 w-full max-w-xs mb-8">
        <div className="h-1 flex-1 rounded-full bg-white/20"></div>
        <div className="h-1 flex-1 rounded-full bg-[#C7F464]"></div>
      </div>

      {/* Main Interaction Area */}
      <div className="flex flex-col w-full">
        {/* Clean Minimal Header */}
        <h1 className="text-3xl font-semibold tracking-tight text-white/90 leading-tight mb-10 max-w-[260px] font-headline">
          How you eat<br />and move.
        </h1>

        {/* Kinetic Vertical Activity Selector */}
        <div className="relative flex items-center justify-between w-full h-44 mb-10">
          {/* Massive Word Typography Display */}
          <div className="flex flex-col justify-center min-w-0 pr-4">
            <span className="text-6xl sm:text-7xl font-light tracking-tighter text-white transition-all duration-200 font-headline">
              {LEVELS[activeIndex].title}
            </span>
            <span className="text-xs font-mono tracking-widest text-[#a1a1aa] uppercase mt-2">
              {LEVELS[activeIndex].freq}
            </span>
          </div>

          {/* Tactile Vertical 5-Stop Track & Slider Indicator */}
          <div className="relative flex flex-col justify-between items-center h-full w-10 py-1">
            {/* Vertical Spine */}
            <div className="absolute inset-y-3 w-0.5 bg-[#27272a] rounded-full pointer-events-none"></div>

            {/* 5 Visual Notches (Indices 4, 3, 2, 1, 0 from top to bottom) */}
            {[4, 3, 2, 1, 0].map((idx) => (
              <button
                key={idx}
                type="button"
                aria-label={LEVELS[idx].title}
                onClick={() => setActiveIndex(idx)}
                className="relative z-10 w-8 h-8 flex items-center justify-center group focus:outline-none"
              >
                <span
                  className={`rounded-full transition-all ${
                    activeIndex === idx
                      ? 'w-2 h-2 bg-[#C7F464] scale-125'
                      : 'w-1.5 h-1.5 bg-[#71717a] group-hover:scale-125'
                  }`}
                ></span>
              </button>
            ))}

            {/* Floating Tactile Thumb (Lime Accent) */}
            <div
              className="absolute right-1 w-8 h-8 rounded-full bg-[#C7F464] flex items-center justify-center shadow-lg transition-all duration-200 pointer-events-none"
              style={{ top: THUMB_POSITIONS[activeIndex] }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#09090b]"></div>
            </div>
          </div>
        </div>

        {/* Organic Fluid Diet Chips Flow */}
        <div className="flex flex-wrap gap-2.5 items-center w-full pt-2">
          {allChips.map((chip) => {
            const isSelected = selectedChips.includes(chip);
            return (
              <button
                key={chip}
                type="button"
                onClick={() => toggleChip(chip)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#C7F464] text-[#09090b] font-semibold shadow-sm'
                    : 'bg-[#18181b] text-white hover:bg-[#27272a]'
                }`}
              >
                {chip}
              </button>
            );
          })}

          {/* Dashed Add Custom Chip */}
          <button
            type="button"
            onClick={handleAddCustomChip}
            className="px-4 py-2.5 rounded-full text-sm font-medium transition-all bg-[#121215] border border-dashed border-white/20 text-[#a1a1aa] hover:text-white active:scale-95"
          >
            + Add your own
          </button>
        </div>
      </div>

      {/* Bottom-Weighted Completion Action */}
      <div className="flex items-center justify-between w-full pt-16 pb-4">
        <span className="text-xs font-mono tracking-widest text-[#71717a] uppercase">
          Step 2 of 2
        </span>
        <button
          type="button"
          aria-label="Complete setup"
          onClick={handleComplete}
          className="w-14 h-14 rounded-full bg-[#C7F464] text-[#09090b] flex items-center justify-center transition-transform active:scale-90 shadow-md font-bold"
        >
          <span className="material-symbols-outlined text-2xl font-bold">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};
