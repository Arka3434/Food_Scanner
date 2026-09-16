import React, { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import { GoalSlider } from '../components/common/GoalSlider';
import { FitnessGoal } from '../types';

export const ProfilePage: React.FC = () => {
  const {
    userProfile,
    targets,
    updateProfile,
    updateTargets,
    resetToDefaults
  } = useNutrition();

  const [localProfile, setLocalProfile] = useState(userProfile);
  const [localTargets, setLocalTargets] = useState(targets);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const dietaryOptions = [
    "Gluten-Free",
    "Dairy-Free",
    "Nut Allergy",
    "Vegan",
    "Vegetarian",
    "Keto / Low-Carb",
    "Halal"
  ];

  const handleGoalSelect = (goal: FitnessGoal) => {
    setLocalProfile(prev => ({ ...prev, goal }));
    if (goal === 'fat-loss') {
      setLocalTargets(prev => ({ ...prev, calories: 1950, protein: 165, carbs: 180, fat: 60 }));
    } else if (goal === 'muscle-gain') {
      setLocalTargets(prev => ({ ...prev, calories: 2600, protein: 185, carbs: 310, fat: 75 }));
    } else {
      setLocalTargets(prev => ({ ...prev, calories: 2200, protein: 160, carbs: 240, fat: 70 }));
    }
  };

  const handleToggleRestriction = (opt: string) => {
    setLocalProfile(prev => {
      const exists = prev.restrictions.includes(opt);
      return {
        ...prev,
        restrictions: exists
          ? prev.restrictions.filter(r => r !== opt)
          : [...prev.restrictions, opt]
      };
    });
  };

  const handleSaveAll = () => {
    updateProfile(localProfile);
    updateTargets(localTargets);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-space-lg pb-12">
      {/* User Header Card (Directly Matching Stitch Screen 05) */}
      <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md shadow-stitch-card border border-surface-container-high/40 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-36 h-36 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-space-md">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-xl shadow-md overflow-hidden">
              <span className="material-symbols-outlined text-[36px]">person</span>
            </div>
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-surface text-on-surface flex items-center justify-center shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-[14px]">edit</span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline text-headline-sm font-bold text-on-surface">
                {localProfile.name}
              </h2>
              {localProfile.isPro && (
                <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed/40 text-on-secondary-fixed font-semibold text-[11px]">
                  Pro Member
                </span>
              )}
            </div>
            <p className="text-body-md text-outline font-medium">{localProfile.email}</p>
          </div>
        </div>

        {/* Stats Row (Age, Height, Weight) */}
        <div className="grid grid-cols-3 gap-space-sm pt-space-sm border-t border-surface-container-high/60">
          <div className="flex flex-col items-center p-space-sm rounded-lg bg-surface-container/50">
            <span className="text-label-sm text-outline font-medium">Age</span>
            <span className="font-headline text-headline-sm font-bold text-on-surface">
              {localProfile.age}
            </span>
          </div>
          <div className="flex flex-col items-center p-space-sm rounded-lg bg-surface-container/50">
            <span className="text-label-sm text-outline font-medium">Height</span>
            <span className="font-headline text-headline-sm font-bold text-on-surface">
              {localProfile.height} cm
            </span>
          </div>
          <div className="flex flex-col items-center p-space-sm rounded-lg bg-surface-container/50">
            <span className="text-label-sm text-outline font-medium">Weight</span>
            <span className="font-headline text-headline-sm font-bold text-on-surface">
              {localProfile.weight} kg
            </span>
          </div>
        </div>
      </div>

      {/* Primary Fitness Goal Selector (Matching Stitch Screen 05) */}
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
            Primary Fitness Goal
          </h3>
          <span className="text-body-sm text-primary font-bold">AI Optimized</span>
        </div>

        <div className="grid grid-cols-3 gap-space-sm">
          <button
            type="button"
            onClick={() => handleGoalSelect('fat-loss')}
            className={`flex flex-col items-center justify-center gap-space-xs p-space-md rounded-xl transition-all border-2 ${
              localProfile.goal === 'fat-loss'
                ? 'bg-primary text-on-primary border-transparent shadow-stitch-btn'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
            <span className="font-label-md font-semibold">Fat Loss</span>
          </button>

          <button
            type="button"
            onClick={() => handleGoalSelect('maintenance')}
            className={`flex flex-col items-center justify-center gap-space-xs p-space-md rounded-xl transition-all border-2 ${
              localProfile.goal === 'maintenance'
                ? 'bg-primary text-on-primary border-transparent shadow-stitch-btn'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">balance</span>
            <span className="font-label-md font-semibold">Maintenance</span>
          </button>

          <button
            type="button"
            onClick={() => handleGoalSelect('muscle-gain')}
            className={`flex flex-col items-center justify-center gap-space-xs p-space-md rounded-xl transition-all border-2 ${
              localProfile.goal === 'muscle-gain'
                ? 'bg-primary text-on-primary border-transparent shadow-stitch-btn'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">fitness_center</span>
            <span className="font-label-md font-semibold">Muscle Gain</span>
          </button>
        </div>
      </div>

      {/* Daily Nutrition Targets Sliders (Matching Stitch Screen 05) */}
      <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-lg shadow-stitch-card border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
              Daily Nutrition Targets
            </h3>
            <p className="text-body-sm text-outline">Adjust your macro split &amp; calorie goals</p>
          </div>
          <button
            type="button"
            onClick={resetToDefaults}
            className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-primary shadow-sm hover:bg-surface-container transition-colors"
            title="Reset to default targets"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>

        <GoalSlider
          label="Daily Calories"
          value={localTargets.calories}
          unit="kcal"
          min={1200}
          max={4000}
          step={50}
          onChange={(val) => setLocalTargets(prev => ({ ...prev, calories: val }))}
        />

        <GoalSlider
          label="Protein"
          value={localTargets.protein}
          unit="g"
          min={50}
          max={300}
          step={5}
          onChange={(val) => setLocalTargets(prev => ({ ...prev, protein: val }))}
        />

        <GoalSlider
          label="Carbohydrates"
          value={localTargets.carbs}
          unit="g"
          min={50}
          max={500}
          step={10}
          onChange={(val) => setLocalTargets(prev => ({ ...prev, carbs: val }))}
        />

        <GoalSlider
          label="Fats"
          value={localTargets.fat}
          unit="g"
          min={30}
          max={180}
          step={5}
          onChange={(val) => setLocalTargets(prev => ({ ...prev, fat: val }))}
        />

        <GoalSlider
          label="Water Intake"
          value={localTargets.water}
          unit="ml"
          min={1000}
          max={5000}
          step={250}
          onChange={(val) => setLocalTargets(prev => ({ ...prev, water: val }))}
        />
      </div>

      {/* Dietary Restrictions & Allergens */}
      <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md shadow-stitch-card border border-surface-container-high/40">
        <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
          Dietary Restrictions &amp; Allergies
        </h3>
        <p className="text-body-sm text-outline">
          Select dietary tags to filter recommendations and trigger meal alerts.
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {dietaryOptions.map(opt => {
            const isSelected = localProfile.restrictions.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleToggleRestriction(opt)}
                className={`px-3.5 py-1.5 rounded-full text-label-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container-high border border-surface-container-high/60'
                }`}
              >
                {isSelected ? `✓ ${opt}` : opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* App Preferences & Settings */}
      <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md shadow-stitch-card border border-surface-container-high/40">
        <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
          Preferences &amp; Units
        </h3>

        <div className="flex items-center justify-between py-2 border-b border-surface-container-high/40">
          <div>
            <span className="text-label-md font-semibold text-on-surface">Measurement System</span>
            <p className="text-body-sm text-outline">Metric (kg, cm, ml) vs Imperial (lbs, in, fl oz)</p>
          </div>
          <div className="flex bg-surface-container p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setLocalProfile(prev => ({ ...prev, unit: 'metric' }))}
              className={`px-3 py-1 text-xs font-bold rounded ${
                localProfile.unit === 'metric' ? 'bg-surface text-on-surface shadow-xs' : 'text-outline'
              }`}
            >
              Metric
            </button>
            <button
              type="button"
              onClick={() => setLocalProfile(prev => ({ ...prev, unit: 'imperial' }))}
              className={`px-3 py-1 text-xs font-bold rounded ${
                localProfile.unit === 'imperial' ? 'bg-surface text-on-surface shadow-xs' : 'text-outline'
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-label-md font-semibold text-on-surface">Daily Meal Reminders</span>
            <p className="text-body-sm text-outline">Push notifications for logging hydration and meals</p>
          </div>
          <input
            type="checkbox"
            checked={localProfile.notifications}
            onChange={(e) => setLocalProfile(prev => ({ ...prev, notifications: e.target.checked }))}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSaveAll}
        className="w-full h-14 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-space-sm shadow-stitch-btn hover:bg-primary-container transition-all"
      >
        <span className="material-symbols-outlined text-[22px]">
          {savedSuccess ? 'check_circle' : 'save'}
        </span>
        <span>{savedSuccess ? 'Settings Saved Successfully!' : 'Save Changes'}</span>
      </button>
    </div>
  );
};
