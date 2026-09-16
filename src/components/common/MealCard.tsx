import React from 'react';
import { LoggedMeal, MealCategory } from '../../types';

interface MealCardProps {
  category: MealCategory;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  meals: LoggedMeal[];
  onAddFood: (category: MealCategory) => void;
  onDeleteMeal: (mealId: string) => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  category,
  title,
  icon,
  iconBg,
  iconColor,
  meals,
  onAddFood,
  onDeleteMeal
}) => {
  const totalKcal = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);

  if (meals.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-space-md border-2 border-dashed border-outline-variant/40 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-outline">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <div>
            <h4 className="text-label-md font-semibold text-on-surface">{title}</h4>
            <p className="text-body-sm text-outline">Not logged yet</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAddFood(category)}
          className="px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-full text-label-sm font-medium flex items-center gap-space-xs transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Add Food
        </button>
      </div>
    );
  }

  const mealSummaryNames = meals.map(m => m.name).join(', ');

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-stitch-card border border-surface-container-high/30 flex flex-col gap-space-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-space-sm">
          <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center ${iconColor}`}>
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          </div>
          <div>
            <h4 className="text-label-md font-semibold text-on-surface">{title}</h4>
            <p className="text-body-sm text-outline line-clamp-1 max-w-[200px] sm:max-w-xs">
              {mealSummaryNames}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-label-md font-semibold text-on-surface">
            {totalKcal} kcal
          </span>
        </div>
      </div>

      {/* Mini item list with delete button */}
      <div className="flex flex-col gap-1 border-t border-surface-container pt-2">
        {meals.map((meal) => (
          <div key={meal.id} className="flex justify-between items-center text-xs py-0.5">
            <span className="text-on-surface-variant font-medium truncate max-w-[180px]">
              {meal.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-outline font-semibold">{meal.calories} kcal</span>
              <button
                type="button"
                onClick={() => onDeleteMeal(meal.id)}
                className="text-outline hover:text-error transition-colors p-0.5"
                title="Remove item"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Macro summary pills & Add action */}
      <div className="flex justify-between items-center pt-space-xs border-t border-surface-container/60">
        <div className="flex gap-space-xs">
          <span className="px-space-sm py-0.5 bg-surface-container rounded-full text-body-sm text-outline">
            P: {totalProtein}g
          </span>
          <span className="px-space-sm py-0.5 bg-surface-container rounded-full text-body-sm text-outline">
            C: {totalCarbs}g
          </span>
          <span className="px-space-sm py-0.5 bg-surface-container rounded-full text-body-sm text-outline">
            F: {totalFat}g
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddFood(category)}
          className="text-primary text-label-sm font-medium flex items-center gap-1 hover:opacity-80"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Add
        </button>
      </div>
    </div>
  );
};
