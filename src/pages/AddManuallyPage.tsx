import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../context/NutritionContext';
import { MealCategory } from '../types';

export const AddManuallyPage: React.FC = () => {
  const navigate = useNavigate();
  const { addMeal } = useNutrition();

  const [foodName, setFoodName] = useState('Custom Meal');
  const [servingAmount, setServingAmount] = useState('100');
  const [servingUnit, setServingUnit] = useState('g');
  const [protein, setProtein] = useState('28');
  const [carbs, setCarbs] = useState('32');
  const [fat, setFat] = useState('12');
  const [fiber, setFiber] = useState('4');
  const [showFiber, setShowFiber] = useState(false);
  const [selectedMealCategory, setSelectedMealCategory] = useState<MealCategory>('breakfast');
  const [showToast, setShowToast] = useState(false);

  // Auto-calculate calories from macros: Calories = 4*P + 4*C + 9*F
  const [calories, setCalories] = useState<string>('340');
  const [isCalorieManual, setIsCalorieManual] = useState(false);

  useEffect(() => {
    if (!isCalorieManual) {
      const p = parseFloat(protein) || 0;
      const c = parseFloat(carbs) || 0;
      const f = parseFloat(fat) || 0;
      const autoCal = Math.round(p * 4 + c * 4 + f * 9);
      setCalories(autoCal.toString());
    }
  }, [protein, carbs, fat, isCalorieManual]);

  const mealOptions: { id: MealCategory; label: string }[] = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snack' }
  ];

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCalories = parseFloat(calories) || 0;
    const finalProtein = parseFloat(protein) || 0;
    const finalCarbs = parseFloat(carbs) || 0;
    const finalFat = parseFloat(fat) || 0;
    const finalFiber = showFiber ? parseFloat(fiber) || 0 : 0;

    addMeal({
      name: foodName.trim() || 'Custom Meal',
      category: selectedMealCategory,
      calories: finalCalories,
      protein: finalProtein,
      carbs: finalCarbs,
      fat: finalFat,
      fiber: finalFiber,
      items: [
        {
          name: foodName.trim() || 'Custom Meal',
          portion: `${servingAmount} ${servingUnit}`,
          calories: finalCalories,
          protein: finalProtein,
          carbs: finalCarbs,
          fat: finalFat
        }
      ]
    });

    setShowToast(true);
    setTimeout(() => {
      navigate('/foods');
    }, 1100);
  };

  return (
    <div className="flex flex-col relative w-full min-h-screen bg-[#09090b] text-white select-none pb-28 max-w-md mx-auto">
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#09090b]/90 backdrop-blur-xl pt-safe border-b border-white/[0.04]">
        <div className="h-16 px-4 flex items-center justify-between">
          <button
            type="button"
            aria-label="Back to Food Items"
            onClick={() => navigate('/foods')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#18181b] text-white hover:bg-[#27272a] active:scale-95 transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <h1 className="text-xl font-headline font-bold tracking-tight text-white">
            Add Manually
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* 2. FORM BODY */}
      <main className="flex-1 flex flex-col px-4 py-4 space-y-4">
        {/* Photo Upload Card */}
        <div>
          <label className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-white/10 rounded-2xl cursor-pointer bg-[#121215] hover:bg-[#18181b] transition-all relative overflow-hidden group">
            <div className="flex flex-col items-center justify-center py-4 text-[#a1a1aa] group-hover:text-white">
              <span className="material-symbols-outlined text-3xl mb-1 text-[#4F8CFF]">
                photo_camera
              </span>
              <span className="text-xs font-medium font-headline">Add photo</span>
            </div>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Input Rows Container */}
        <div className="space-y-2 bg-[#121215] p-3 rounded-2xl border border-white/5 font-mono">
          {/* Row 1: Food Name */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-[#18181b] rounded-xl border border-white/5 focus-within:border-[#4F8CFF]/50 transition-colors">
            <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase font-headline">
              Food Name
            </span>
            <input
              type="text"
              value={foodName}
              onChange={e => setFoodName(e.target.value)}
              placeholder="e.g. Protein Shake"
              className="bg-transparent text-right font-medium text-white focus:outline-none rounded px-2 py-0.5 max-w-[200px]"
            />
          </div>

          {/* Row 2: Serving Size */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-[#18181b] rounded-xl border border-white/5">
            <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase font-headline">
              Serving Size
            </span>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={servingAmount}
                onChange={e => setServingAmount(e.target.value)}
                className="bg-transparent text-right font-medium text-white w-16 focus:outline-none rounded px-1 py-0.5"
              />
              <select
                value={servingUnit}
                onChange={e => setServingUnit(e.target.value)}
                className="bg-[#27272a] text-white text-xs rounded-lg px-2 py-1 focus:outline-none border border-white/10"
              >
                <option value="g">g</option>
                <option value="oz">oz</option>
                <option value="ml">ml</option>
                <option value="cup">cup</option>
                <option value="serving">serving</option>
              </select>
            </div>
          </div>

          {/* Row 3: Calories */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-[#18181b] rounded-xl border border-white/5">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase font-headline">
                Calories
              </span>
              <span className="text-[10px] text-[#C7F464] font-headline">
                Auto-calculated from macros
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="0"
                value={calories}
                onChange={e => {
                  setIsCalorieManual(true);
                  setCalories(e.target.value);
                }}
                className="bg-transparent text-right font-bold text-[#C7F464] w-20 focus:outline-none rounded px-1 py-0.5 text-base"
              />
              <span className="text-xs text-[#a1a1aa]">kcal</span>
            </div>
          </div>

          {/* Row 4: Protein */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-[#18181b] rounded-xl border border-white/5">
            <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase font-headline">
              Protein
            </span>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="0"
                step="0.5"
                value={protein}
                onChange={e => {
                  setIsCalorieManual(false);
                  setProtein(e.target.value);
                }}
                className="bg-transparent text-right font-medium text-white w-16 focus:outline-none rounded px-1 py-0.5"
              />
              <span className="text-xs text-[#a1a1aa]">g</span>
            </div>
          </div>

          {/* Row 5: Carbs */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-[#18181b] rounded-xl border border-white/5">
            <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase font-headline">
              Carbs
            </span>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="0"
                step="0.5"
                value={carbs}
                onChange={e => {
                  setIsCalorieManual(false);
                  setCarbs(e.target.value);
                }}
                className="bg-transparent text-right font-medium text-white w-16 focus:outline-none rounded px-1 py-0.5"
              />
              <span className="text-xs text-[#a1a1aa]">g</span>
            </div>
          </div>

          {/* Row 6: Fat */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-[#18181b] rounded-xl border border-white/5">
            <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase font-headline">
              Fat
            </span>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="0"
                step="0.5"
                value={fat}
                onChange={e => {
                  setIsCalorieManual(false);
                  setFat(e.target.value);
                }}
                className="bg-transparent text-right font-medium text-white w-16 focus:outline-none rounded px-1 py-0.5"
              />
              <span className="text-xs text-[#a1a1aa]">g</span>
            </div>
          </div>

          {/* Optional Fiber Toggle */}
          <div className="pt-1">
            {!showFiber ? (
              <button
                type="button"
                onClick={() => setShowFiber(true)}
                className="text-xs font-medium text-[#4F8CFF] hover:text-[#3f7de8] transition-colors flex items-center space-x-1 py-1 font-headline"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add fiber</span>
              </button>
            ) : (
              <div className="flex items-center justify-between py-2.5 px-3 bg-[#18181b] rounded-xl border border-white/5">
                <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase font-headline">
                  Fiber
                </span>
                <div className="flex items-center space-x-1">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={fiber}
                    onChange={e => setFiber(e.target.value)}
                    className="bg-transparent text-right font-medium text-white w-16 focus:outline-none rounded px-1 py-0.5"
                  />
                  <span className="text-xs text-[#a1a1aa]">g</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. MEAL ASSIGNMENT */}
        <div className="pt-2">
          <span className="text-[11px] font-bold tracking-wider text-[#a1a1aa] uppercase block mb-2 font-headline">
            Meal Assignment
          </span>
          <div className="grid grid-cols-4 gap-2">
            {mealOptions.map(opt => {
              const isSelected = selectedMealCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedMealCategory(opt.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all active:scale-95 text-center ${
                    isSelected
                      ? 'bg-[#4F8CFF] text-white shadow-md shadow-[#4F8CFF]/25'
                      : 'bg-[#18181b] text-[#a1a1aa] border border-white/5 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. PRIMARY ACTION BUTTON */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSaveMeal}
            className="w-full py-4 rounded-xl font-semibold bg-[#4F8CFF] hover:bg-[#3f7de8] text-white text-sm shadow-lg shadow-[#4F8CFF]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 font-headline"
          >
            <span className="material-symbols-outlined text-[20px]">check</span>
            <span>Add to {mealOptions.find(m => m.id === selectedMealCategory)?.label}</span>
          </button>
        </div>
      </main>

      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#18181b] text-white px-5 py-3 rounded-full text-xs font-headline shadow-2xl border border-white/15 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[#C7F464] text-[18px]">check_circle</span>
          <span>Added custom food to {mealOptions.find(m => m.id === selectedMealCategory)?.label}!</span>
        </div>
      )}
    </div>
  );
};
