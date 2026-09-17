import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNutrition } from '../../context/NutritionContext';
import { FoodIngredientItem } from '../../types';

export const MealDetailSheet: React.FC = () => {
  const navigate = useNavigate();
  const { mealId } = useParams<{ mealId: string }>();
  const { meals, updateMealItem, deleteMealItem, addMealItem } = useNutrition();

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCalories, setNewItemCalories] = useState('100');
  const [newItemProtein, setNewItemProtein] = useState('10');

  // Find meal by ID or fallback to lunch meal
  const meal = meals.find((m) => m.id === mealId) || meals.find((m) => m.category === 'lunch') || meals[0];

  const handleDone = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  if (!meal) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6">
        <p className="text-white/60">Meal not found.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#4F8CFF] text-white font-semibold text-sm shadow-md"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Calculate dynamic totals from meal
  const totalCalories = meal.calories;
  const totalProtein = meal.protein;
  const totalCarbs = meal.carbs;
  const totalFat = meal.fat;

  const items = meal.items || [];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const cal = parseInt(newItemCalories, 10) || 0;
    const prot = parseInt(newItemProtein, 10) || 0;

    const newItem: FoodIngredientItem = {
      name: newItemName.trim(),
      portion: '1 serving',
      calories: cal,
      protein: prot,
      carbs: 5,
      fat: 2
    };

    addMealItem(meal.id, newItem);
    setNewItemName('');
    setNewItemCalories('100');
    setNewItemProtein('10');
    setIsAddingItem(false);
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col justify-end select-none max-w-md mx-auto">
      {/* Dimmed Background Backdrop */}
      <div className="absolute inset-0 bg-[#0E0F0D] opacity-25 pointer-events-none" />

      {/* Dim overlay tap to close */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-10 transition-opacity"
        onClick={handleDone}
      />

      {/* iOS Bottom Sheet Container */}
      <div className="relative z-20 w-full rounded-t-[28px] bg-[#1A1C19] text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col overflow-hidden pb-6 border-t border-white/10 max-h-[92vh] overflow-y-auto">
        {/* Grab Handle Bar */}
        <div className="w-full flex items-center justify-center pt-3 pb-2 cursor-grab">
          <div className="w-10 h-1 rounded-full bg-white/20"></div>
        </div>

        {/* Top Full-bleed Hero Photo with Tag */}
        <div className="relative w-full h-52 shrink-0 overflow-hidden bg-[#09090b]">
          <img
            src={meal.image || '/images/salmon-poke-bowl.jpg'}
            alt={meal.name}
            className="w-full h-full object-cover object-center"
          />
          {/* Frosted Glass Pill */}
          <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center shadow-md border border-white/10">
            <span className="text-[11px] font-semibold tracking-wider text-white uppercase font-mono">
              {meal.category}
            </span>
          </div>
        </div>

        {/* Food Items Breakdown Header */}
        <div className="w-full px-5 pt-3 pb-1 flex items-center justify-between">
          <span className="text-xs font-headline uppercase font-bold tracking-wider text-[#a1a1aa] font-mono">
            Ingredients ({items.length})
          </span>
          <button
            type="button"
            onClick={() => setIsAddingItem(!isAddingItem)}
            className="text-xs text-[#4F8CFF] hover:underline font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            {isAddingItem ? 'Cancel' : 'Add Item'}
          </button>
        </div>

        {/* Add Item Inline Form */}
        {isAddingItem && (
          <form onSubmit={handleAddItem} className="mx-4 my-2 p-3 bg-[#121215] rounded-xl border border-white/10 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Ingredient name (e.g. Lime Wedge)"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-black/40 text-white text-xs border border-white/10 focus:border-[#4F8CFF] focus:outline-none"
              required
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Calories"
                value={newItemCalories}
                onChange={(e) => setNewItemCalories(e.target.value)}
                className="w-1/2 px-3 py-1.5 rounded-lg bg-black/40 text-white text-xs border border-white/10 focus:border-[#4F8CFF] focus:outline-none font-mono"
              />
              <input
                type="number"
                placeholder="Protein (g)"
                value={newItemProtein}
                onChange={(e) => setNewItemProtein(e.target.value)}
                className="w-1/2 px-3 py-1.5 rounded-lg bg-black/40 text-white text-xs border border-white/10 focus:border-[#4F8CFF] focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="mt-1 py-1.5 rounded-lg bg-[#4F8CFF] text-white text-xs font-semibold"
            >
              Add to Meal
            </button>
          </form>
        )}

        {/* Food Items Breakdown List */}
        <div className="w-full px-5 py-2 flex flex-col">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center justify-between py-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0 bg-[#18181b]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-[#4F8CFF]">restaurant</span>
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[15px] font-medium text-white truncate tracking-[-0.01em]">
                      {item.name}
                    </span>
                    <span className="text-[12px] text-white/50 leading-none mt-0.5 font-mono">
                      {item.portion}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-baseline gap-2 shrink-0 pl-2 font-mono">
                    <div className="text-right">
                      <span className="text-[13px] font-medium text-white">{item.calories}</span>
                      <span className="text-[9px] font-semibold text-white/50 uppercase ml-0.5">kcal</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-medium text-[#C7F464]">{item.protein}</span>
                      <span className="text-[9px] font-semibold text-white/50 uppercase">P</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-medium text-white">{item.carbs}</span>
                      <span className="text-[9px] font-semibold text-white/50 uppercase">C</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-medium text-white">{item.fat}</span>
                      <span className="text-[9px] font-semibold text-white/50 uppercase">F</span>
                    </div>
                  </div>

                  {/* Delete Item Action */}
                  <button
                    type="button"
                    title="Remove item"
                    onClick={() => deleteMealItem(meal.id, idx)}
                    className="size-7 rounded-full bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">delete</span>
                  </button>
                </div>
              </div>
              {idx < items.length - 1 && <div className="w-full h-[1px] bg-white/[0.08]"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Visually Separated Total Block (#222521) */}
        <div className="mx-4 mt-2 mb-4 bg-[#222521] rounded-2xl p-4 flex flex-col border border-white/[0.04]">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50 font-mono">
              TOTAL
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[52px] font-extrabold tracking-tight text-white leading-none font-headline">
                {totalCalories}
              </span>
              <span className="text-sm font-semibold tracking-wider text-white/60 font-mono">
                KCAL
              </span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/[0.08] my-3"></div>

          {/* Summed Macros (Data/Nutrition display in Lime/White) */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.08] text-center">
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-semibold text-[#C7F464] tracking-tight leading-none font-headline">
                {totalProtein}g
              </span>
              <span className="text-[10px] uppercase font-medium text-white/50 mt-1 font-mono">
                PROTEIN
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-semibold text-white tracking-tight leading-none font-headline">
                {totalCarbs}g
              </span>
              <span className="text-[10px] uppercase font-medium text-white/50 mt-1 font-mono">
                CARBS
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-semibold text-white tracking-tight leading-none font-headline">
                {totalFat}g
              </span>
              <span className="text-[10px] uppercase font-medium text-white/50 mt-1 font-mono">
                FAT
              </span>
            </div>
          </div>
        </div>

        {/* Single Accent Action Button (User Action Blue #4F8CFF) */}
        <div className="w-full px-4">
          <button
            type="button"
            onClick={handleDone}
            className="w-full h-13 py-3.5 bg-[#4F8CFF] active:scale-[0.985] text-white font-semibold text-[16px] rounded-full transition-all duration-150 flex items-center justify-center tracking-tight shadow-md font-headline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
