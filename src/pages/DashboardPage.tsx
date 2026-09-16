import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../context/NutritionContext';
import { CalorieProgressRing } from '../components/common/CalorieProgressRing';
import { MacroProgressBar } from '../components/common/MacroProgressBar';
import { WaterTracker } from '../components/common/WaterTracker';
import { MealCard } from '../components/common/MealCard';
import { MealCategory } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    targets,
    consumed,
    remainingCalories,
    caloriePercent,
    meals,
    streak,
    deleteMeal
  } = useNutrition();

  const handleAddFood = (category: MealCategory) => {
    navigate('/log', { state: { targetCategory: category } });
  };

  const getMealsByCategory = (category: MealCategory) => {
    return meals.filter(m => m.category === category);
  };

  return (
    <div className="flex flex-col gap-space-lg pb-12">
      {/* Date & Streak Subheader */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm text-outline">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          <span className="text-label-md font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-label-sm text-on-surface-variant font-semibold">
            Streak: {streak} Days
          </span>
        </div>
      </div>

      {/* Calorie Ring Hero Card (Directly Matching Stitch Screen 02) */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-stitch-card border border-surface-container-high/40 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center gap-space-lg">
          <CalorieProgressRing
            consumed={consumed.calories}
            target={targets.calories}
            size={160}
          />

          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center mb-space-xs">
              <span className="text-body-md text-on-surface-variant font-medium">Consumed</span>
              <span className="text-label-md text-on-surface font-bold">
                {consumed.calories.toLocaleString()} kcal
              </span>
            </div>

            <div className="flex justify-between items-center mb-space-md">
              <span className="text-body-md text-on-surface-variant font-medium">Remaining</span>
              <span className="text-label-md text-primary font-bold">
                {remainingCalories.toLocaleString()} kcal
              </span>
            </div>

            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mb-space-md">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: `${caloriePercent}%` }}
              />
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container-low p-space-sm rounded-lg">
              <span className="material-symbols-outlined text-[18px] text-primary">auto_awesome</span>
              <span className="text-body-sm text-on-surface-variant font-medium">
                {remainingCalories > 0
                  ? "You're right on track for your daily nutrition goal!"
                  : "Daily calorie budget achieved for today!"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrient Progress Cards (Directly Matching Stitch Screen 02) */}
      <div>
        <h3 className="text-headline-sm font-headline font-semibold text-on-surface mb-space-md">
          Macronutrients
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
          <MacroProgressBar
            label="Protein"
            current={consumed.protein}
            target={targets.protein}
            colorVariant="protein"
          />
          <MacroProgressBar
            label="Carbs"
            current={consumed.carbs}
            target={targets.carbs}
            colorVariant="carbs"
          />
          <MacroProgressBar
            label="Fat"
            current={consumed.fat}
            target={targets.fat}
            colorVariant="fat"
          />
        </div>
      </div>

      {/* Micros & Hydration Grid */}
      <div>
        <h3 className="text-headline-sm font-headline font-semibold text-on-surface mb-space-md">
          Micros &amp; Hydration
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md mb-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-stitch-card border border-surface-container-high/40">
            <span className="text-body-sm text-outline block mb-space-xs font-medium">Fiber</span>
            <span className="text-headline-sm font-headline font-bold text-on-surface">
              {consumed.fiber || 16}g
            </span>
            <span className="text-body-sm text-primary block mt-space-xs font-medium">
              Goal: {targets.fiber || 30}g
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-stitch-card border border-surface-container-high/40">
            <span className="text-body-sm text-outline block mb-space-xs font-medium">Sugar</span>
            <span className="text-headline-sm font-headline font-bold text-on-surface">35g</span>
            <span className="text-body-sm text-outline block mt-space-xs font-medium">Limit: 50g</span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-stitch-card border border-surface-container-high/40">
            <span className="text-body-sm text-outline block mb-space-xs font-medium">Sodium</span>
            <span className="text-headline-sm font-headline font-bold text-on-surface">2,100</span>
            <span className="text-body-sm text-outline block mt-space-xs font-medium">mg / 2,300mg</span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-stitch-card border border-surface-container-high/40">
            <span className="text-body-sm text-outline block mb-space-xs font-medium">Water</span>
            <span className="text-headline-sm font-headline font-bold text-on-surface">
              {(useNutrition().waterIntake / 1000).toFixed(1)}L
            </span>
            <span className="text-body-sm text-outline block mt-space-xs font-medium">
              / {(targets.water / 1000).toFixed(1)}L
            </span>
          </div>
        </div>

        {/* Water Tracker Component */}
        <WaterTracker />
      </div>

      {/* Today's Meals Section */}
      <div>
        <div className="flex items-center justify-between mb-space-md">
          <h3 className="text-headline-sm font-headline font-semibold text-on-surface">
            Today's Meals
          </h3>
          <button
            type="button"
            onClick={() => navigate('/log')}
            className="text-label-md text-primary font-bold hover:underline"
          >
            View History
          </button>
        </div>

        <div className="flex flex-col gap-space-md">
          <MealCard
            category="breakfast"
            title="Breakfast"
            icon="wb_sunny"
            iconBg="bg-primary-fixed"
            iconColor="text-on-primary-fixed"
            meals={getMealsByCategory('breakfast')}
            onAddFood={handleAddFood}
            onDeleteMeal={deleteMeal}
          />
          <MealCard
            category="lunch"
            title="Lunch"
            icon="light_mode"
            iconBg="bg-tertiary-fixed"
            iconColor="text-on-tertiary-fixed"
            meals={getMealsByCategory('lunch')}
            onAddFood={handleAddFood}
            onDeleteMeal={deleteMeal}
          />
          <MealCard
            category="dinner"
            title="Dinner"
            icon="nightlight"
            iconBg="bg-surface-container"
            iconColor="text-outline"
            meals={getMealsByCategory('dinner')}
            onAddFood={handleAddFood}
            onDeleteMeal={deleteMeal}
          />
          <MealCard
            category="snack"
            title="Snacks"
            icon="nutrition"
            iconBg="bg-secondary-fixed"
            iconColor="text-on-secondary-fixed"
            meals={getMealsByCategory('snack')}
            onAddFood={handleAddFood}
            onDeleteMeal={deleteMeal}
          />
        </div>
      </div>

      {/* Floating Action Button for Quick Log (Matching Stitch Screen 02) */}
      <div className="fixed bottom-24 right-4 sm:right-8 z-40">
        <button
          type="button"
          onClick={() => navigate('/log')}
          className="bg-primary text-on-primary px-space-lg py-space-md rounded-full shadow-stitch-fab hover:bg-primary-container transition-all flex items-center gap-space-sm group"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">
            add
          </span>
          <span className="text-label-md font-bold font-headline">Log Food</span>
        </button>
      </div>
    </div>
  );
};
