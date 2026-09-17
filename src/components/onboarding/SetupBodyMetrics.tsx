import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../../context/NutritionContext';
import { SexType } from '../../types';

export const SetupBodyMetrics: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useNutrition();

  const [age, setAge] = useState<number>(userProfile.age || 24);
  const [height, setHeight] = useState<number>(userProfile.height || 178);
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>(userProfile.heightUnit || 'cm');
  const [weight, setWeight] = useState<number>(userProfile.weight || 68.2);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>(userProfile.weightUnit || 'kg');
  const [sex, setSex] = useState<SexType>(userProfile.sex || 'MALE');

  const handleHeightUnitToggle = (unit: 'cm' | 'ft') => {
    if (unit === heightUnit) return;
    if (unit === 'ft') {
      setHeight(parseFloat((height / 30.48).toFixed(1)));
    } else {
      setHeight(Math.round(height * 30.48));
    }
    setHeightUnit(unit);
  };

  const handleWeightUnitToggle = (unit: 'kg' | 'lb') => {
    if (unit === weightUnit) return;
    if (unit === 'lb') {
      setWeight(parseFloat((weight * 2.20462).toFixed(1)));
    } else {
      setWeight(parseFloat((weight / 2.20462).toFixed(1)));
    }
    setWeightUnit(unit);
  };

  const handleNext = () => {
    // Normalise to metric for canonical storage if needed
    const normalizedHeight = heightUnit === 'ft' ? Math.round(height * 30.48) : height;
    const normalizedWeight = weightUnit === 'lb' ? parseFloat((weight / 2.20462).toFixed(1)) : weight;

    updateProfile({
      age,
      height: normalizedHeight,
      heightUnit,
      weight: normalizedWeight,
      weightUnit,
      sex
    });

    navigate('/setup/preferences');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col justify-between px-6 pt-6 pb-8 select-none max-w-md mx-auto">
      {/* Step 1 of 2 Progress Bar */}
      <div className="w-full pt-2">
        <div className="flex items-center gap-1.5 w-full">
          <div className="h-1 flex-1 rounded-full bg-[#C7F464]"></div>
          <div className="h-1 flex-1 rounded-full bg-white/20"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col justify-end w-full space-y-9 mt-auto">
        {/* Title */}
        <div>
          <h1 className="text-[32px] leading-tight font-bold tracking-tight text-white/90 font-headline">
            The basics.
          </h1>
        </div>

        {/* Metric Rows */}
        <div className="flex flex-col w-full">
          {/* AGE ROW */}
          <div className="flex items-baseline justify-between py-4 bg-[#09090b]">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-white/50 uppercase font-mono">
              AGE
            </span>
            <div className="flex items-baseline">
              <input
                type="number"
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0))}
                className="bg-transparent text-right text-[32px] font-medium tracking-tight text-white/95 focus:outline-none w-24 appearance-none m-0 p-0 font-headline"
              />
            </div>
          </div>
          <div className="w-full h-px bg-white/[0.08]"></div>

          {/* HEIGHT ROW */}
          <div className="flex items-baseline justify-between py-4 bg-[#09090b]">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-white/50 uppercase font-mono">
              HEIGHT
            </span>
            <div className="flex items-baseline gap-2.5">
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                className="bg-transparent text-right text-[32px] font-medium tracking-tight text-white/95 focus:outline-none w-28 appearance-none m-0 p-0 font-headline"
              />
              <div className="flex items-center p-0.5 rounded bg-white/[0.06] text-[10px] tracking-wider uppercase font-medium">
                <button
                  type="button"
                  onClick={() => handleHeightUnitToggle('cm')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    heightUnit === 'cm' ? 'text-white bg-white/20' : 'text-white/40 hover:text-white'
                  }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => handleHeightUnitToggle('ft')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    heightUnit === 'ft' ? 'text-white bg-white/20' : 'text-white/40 hover:text-white'
                  }`}
                >
                  ft
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/[0.08]"></div>

          {/* WEIGHT ROW */}
          <div className="flex items-baseline justify-between py-4 bg-[#09090b]">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-white/50 uppercase font-mono">
              WEIGHT
            </span>
            <div className="flex items-baseline gap-2.5">
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="bg-transparent text-right text-[32px] font-medium tracking-tight text-white/95 focus:outline-none w-28 appearance-none m-0 p-0 font-headline"
              />
              <div className="flex items-center p-0.5 rounded bg-white/[0.06] text-[10px] tracking-wider uppercase font-medium">
                <button
                  type="button"
                  onClick={() => handleWeightUnitToggle('kg')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    weightUnit === 'kg' ? 'text-white bg-white/20' : 'text-white/40 hover:text-white'
                  }`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => handleWeightUnitToggle('lb')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    weightUnit === 'lb' ? 'text-white bg-white/20' : 'text-white/40 hover:text-white'
                  }`}
                >
                  lb
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sex Segmented Control */}
        <div className="relative w-full p-1 rounded-full bg-white/[0.04] backdrop-blur-md">
          <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"></div>
          <div className="relative flex items-center justify-between w-full text-[11px] font-semibold tracking-wider uppercase">
            {(['MALE', 'FEMALE', 'OTHER'] as SexType[]).map((genderOption) => (
              <button
                key={genderOption}
                type="button"
                onClick={() => setSex(genderOption)}
                className={`flex-1 py-2.5 rounded-full text-center transition-all ${
                  sex === genderOption ? 'text-white bg-white/10 shadow-sm' : 'text-white/50 hover:text-white'
                }`}
              >
                {genderOption}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Action Row */}
        <div className="flex items-center justify-end w-full pt-4">
          <button
            type="button"
            aria-label="Proceed to next step"
            onClick={handleNext}
            className="w-14 h-14 rounded-full bg-[#C7F464] flex items-center justify-center text-[#09090b] active:scale-95 transition-transform duration-150 shadow-lg"
          >
            <span className="material-symbols-outlined text-[28px] font-bold">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
