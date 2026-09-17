import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_FOOD_ITEMS } from '../data/mockData';
import { useNutrition } from '../context/NutritionContext';
import { MealCategory } from '../types';

export const FoodDetailPage: React.FC = () => {
  const { foodId } = useParams<{ foodId: string }>();
  const navigate = useNavigate();
  const { addMeal } = useNutrition();

  // Find the selected food item, fallback to Greek Yogurt if not found
  const baseFood = useMemo(() => {
    return MOCK_FOOD_ITEMS.find(f => f.id === foodId) || MOCK_FOOD_ITEMS[0];
  }, [foodId]);

  const [isFavorite, setIsFavorite] = useState(baseFood.isFavorite ?? false);
  const [servings, setServings] = useState<number>(1.0);
  const [selectedMealCategory, setSelectedMealCategory] = useState<MealCategory>(
    (baseFood.category.toLowerCase() as MealCategory) || 'breakfast'
  );
  const [showToast, setShowToast] = useState(false);

  // Scaled calculations based on selected servings
  const calculatedCalories = Math.round(baseFood.calories * servings);
  const calculatedProtein = Math.round(baseFood.protein * servings);
  const calculatedCarbs = Math.round(baseFood.carbs * servings);
  const calculatedFat = parseFloat((baseFood.fat * servings).toFixed(1));

  const handleStepServing = (delta: number) => {
    setServings(prev => {
      const next = Math.max(0.5, Math.min(5.0, parseFloat((prev + delta).toFixed(1))));
      return next;
    });
  };

  const handleAddFoodToMeal = () => {
    addMeal({
      name: baseFood.name,
      category: selectedMealCategory,
      calories: calculatedCalories,
      protein: calculatedProtein,
      carbs: calculatedCarbs,
      fat: calculatedFat,
      image: baseFood.image,
      items: [
        {
          name: baseFood.name,
          portion: `${servings} ${baseFood.servingUnit || 'serving'} (${Math.round(
            (baseFood.servingSize || 1) * servings * 100
          )}g)`,
          calories: calculatedCalories,
          protein: calculatedProtein,
          carbs: calculatedCarbs,
          fat: calculatedFat,
          image: baseFood.image
        }
      ]
    });

    setShowToast(true);
    setTimeout(() => {
      navigate('/foods');
    }, 1100);
  };

  const mealOptions: { id: MealCategory; label: string }[] = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snack' }
  ];

  return (
    <div className="flex flex-col relative w-full min-h-screen bg-[#09090b] text-white select-none pb-28 max-w-md mx-auto">
      {/* 1. HERO IMAGE WITH TOP CONTROLS */}
      <div className="relative w-full h-[38vh] min-h-[260px] bg-cover bg-center rounded-b-3xl overflow-hidden shadow-2xl">
        <img
          src={baseFood.image || '/images/salmon-poke-bowl.jpg'}
          alt={baseFood.name}
          className="w-full h-full object-cover object-center"
        />
        {/* Soft Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#09090b]" />

        {/* Back Button */}
        <button
          type="button"
          aria-label="Back to Food Items"
          onClick={() => navigate('/foods')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform border border-white/10 z-10 hover:bg-black/80"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        {/* Favorite Button */}
        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform border border-white/10 z-10 ${
            isFavorite ? 'text-[#4F8CFF]' : 'text-white/60 hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: isFavorite ? '"FILL" 1' : '"FILL" 0' }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* 2. FOOD TITLE & PORTION */}
      <div className="px-6 -mt-2 mb-5">
        <h1 className="text-[24px] font-headline font-bold tracking-tight text-white mb-1">
          {baseFood.name}
        </h1>
        <p className="text-[13px] text-[#a1a1aa] font-mono">
          {servings} {baseFood.servingUnit || 'serving'} • {baseFood.portion}
        </p>
      </div>

      {/* 3. SERVING STEPPER & SLIDER */}
      <div className="px-6 mb-6">
        <div className="bg-[#18181b] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-6 mb-3">
            <button
              type="button"
              aria-label="Decrease servings"
              onClick={() => handleStepServing(-0.5)}
              className="w-9 h-9 rounded-full bg-[#27272a] hover:bg-[#323236] flex items-center justify-center text-white active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>

            <div className="flex items-baseline space-x-1.5 font-mono">
              <span className="text-[28px] font-bold text-white leading-none">
                {servings}
              </span>
              <span className="text-xs text-[#a1a1aa]">
                {baseFood.servingUnit || 'serving'}{servings > 1 ? 's' : ''}
              </span>
            </div>

            <button
              type="button"
              aria-label="Increase servings"
              onClick={() => handleStepServing(0.5)}
              className="w-9 h-9 rounded-full bg-[#27272a] hover:bg-[#323236] flex items-center justify-center text-white active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Interactive Tick Slider */}
          <div className="w-full relative flex flex-col items-center">
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.5"
              value={servings}
              onChange={e => setServings(parseFloat(e.target.value))}
              className="w-full h-8 appearance-none bg-[#27272a] rounded-full cursor-pointer accent-[#4F8CFF] px-2 outline-none"
            />
            <div className="w-full flex justify-between px-3 text-white/20 text-[10px] pointer-events-none -mt-6 mb-1">
              <span>0.5x</span>
              <span>1x</span>
              <span>1.5x</span>
              <span>2x</span>
              <span>2.5x</span>
              <span>3x</span>
              <span>4x</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MACRO & CALORIE STATS 4-GRID */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-4 gap-2 bg-[#18181b] p-4 rounded-2xl border border-white/5 text-center font-mono">
          <div className="flex flex-col">
            <span className="text-[17px] font-bold text-white">{calculatedCalories}</span>
            <span className="text-[10px] uppercase text-[#a1a1aa] font-medium tracking-wider">kcal</span>
          </div>
          <div className="flex flex-col border-l border-white/10">
            <span className="text-[17px] font-bold text-[#C7F464]">{calculatedProtein}g</span>
            <span className="text-[10px] uppercase text-[#a1a1aa] font-medium tracking-wider">Protein</span>
          </div>
          <div className="flex flex-col border-l border-white/10">
            <span className="text-[17px] font-bold text-white">{calculatedCarbs}g</span>
            <span className="text-[10px] uppercase text-[#a1a1aa] font-medium tracking-wider">Carbs</span>
          </div>
          <div className="flex flex-col border-l border-white/10">
            <span className="text-[17px] font-bold text-white">{calculatedFat}g</span>
            <span className="text-[10px] uppercase text-[#a1a1aa] font-medium tracking-wider">Fat</span>
          </div>
        </div>
      </div>

      {/* 5. MEAL ASSIGNMENT */}
      <div className="px-6 mb-7">
        <h2 className="text-xs font-headline font-semibold tracking-wider text-[#a1a1aa] uppercase mb-3">
          Meal Assignment
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {mealOptions.map(opt => {
            const isSelected = selectedMealCategory === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedMealCategory(opt.id)}
                className={`py-2.5 rounded-xl font-medium text-xs transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#4F8CFF] text-white font-semibold shadow-md shadow-[#4F8CFF]/25'
                    : 'bg-[#18181b] border border-white/5 text-[#a1a1aa] hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. PRIMARY CTA: Add to Meal */}
      <div className="px-6">
        <button
          type="button"
          onClick={handleAddFoodToMeal}
          className="w-full py-4 bg-[#4F8CFF] hover:bg-[#3f7de8] text-white font-headline font-semibold rounded-xl text-center shadow-lg shadow-[#4F8CFF]/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Add to {mealOptions.find(m => m.id === selectedMealCategory)?.label}</span>
        </button>
      </div>

      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#18181b] text-white px-5 py-3 rounded-full text-xs font-headline shadow-2xl border border-white/15 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[#C7F464] text-[18px]">check_circle</span>
          <span>Added {calculatedCalories} kcal to {mealOptions.find(m => m.id === selectedMealCategory)?.label}!</span>
        </div>
      )}
    </div>
  );
};
