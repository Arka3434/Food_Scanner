import React, { useState } from 'react';
import { FoodItem, MealCategory } from '../../types';
import { ServingStepper } from './ServingStepper';

interface FoodCardProps {
  food: FoodItem;
  onAddToLog: (food: FoodItem, quantity: number, category: MealCategory) => void;
  onToggleFavorite: (id: string) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  onAddToLog,
  onToggleFavorite
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('lunch');

  const totalCalories = Math.round(food.calories * quantity);
  const totalProtein = Math.round(food.protein * quantity);
  const totalCarbs = Math.round(food.carbs * quantity);
  const totalFat = Math.round(food.fat * quantity);

  const getFoodIcon = () => {
    switch (food.category) {
      case 'indian': return 'soup_kitchen';
      case 'breakfast': return 'breakfast_dining';
      case 'protein': return 'fitness_center';
      case 'dinner': return 'dinner_dining';
      case 'snacks': return 'nutrition';
      default: return 'restaurant';
    }
  };

  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-stitch-card border border-surface-container-high/30 flex flex-col gap-space-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-headline">
            <span className="material-symbols-outlined text-[24px]">{getFoodIcon()}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-headline-sm font-headline font-semibold text-on-surface">
                {food.name}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-medium capitalize">
                {food.category}
              </span>
            </div>
            <p className="text-body-sm text-outline">{food.portion}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(food.id)}
          className={`p-2 transition-colors ${
            food.isFavorite ? 'text-error' : 'text-outline hover:text-primary'
          }`}
          title={food.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span 
            className="material-symbols-outlined text-[22px]"
            style={food.isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Macros & Serving Adjuster Bar */}
      <div className="flex flex-col gap-space-sm bg-surface-container-low p-3 rounded-lg">
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-outline">
            {quantity > 1 ? `${quantity}x serving (${food.portion})` : `Per serving (${food.portion})`}
          </span>
          <span className="text-primary font-bold">{totalCalories} kcal</span>
        </div>

        <div className="flex items-center justify-between text-label-sm">
          <div className="flex gap-3">
            <span className="text-on-surface-variant">P: <strong className="text-on-surface">{totalProtein}g</strong></span>
            <span className="text-on-surface-variant">C: <strong className="text-on-surface">{totalCarbs}g</strong></span>
            <span className="text-on-surface-variant">F: <strong className="text-on-surface">{totalFat}g</strong></span>
          </div>

          <ServingStepper
            value={quantity}
            onChange={setQuantity}
            unit="serving"
            min={0.5}
            max={10}
            step={0.5}
          />
        </div>
      </div>

      {/* Category selector & Add button */}
      <div className="flex items-center gap-2">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as MealCategory)}
          className="bg-surface-container-low border border-surface-container-high/60 rounded-lg px-2.5 py-2 text-label-sm font-medium text-on-surface outline-none cursor-pointer"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>

        <button
          type="button"
          onClick={() => onAddToLog(food, quantity, selectedCategory)}
          className="flex-1 h-10 bg-primary text-on-primary rounded-lg text-label-md font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-primary-container transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Add to {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </button>
      </div>
    </div>
  );
};
