import React, { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import { FoodCard } from '../components/common/FoodCard';
import { FilterPill } from '../components/common/FilterPill';
import { FoodItem, MealCategory } from '../types';

export const FoodLogPage: React.FC = () => {
  const { foods, addMeal, toggleFavorite } = useNutrition();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'explore' | 'favorites'>('explore');
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = [
    { id: 'all', label: 'All Foods' },
    { id: 'indian', label: 'Indian' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'protein', label: 'Protein' }
  ];

  const favoritesCount = foods.filter(f => f.isFavorite).length;

  const filteredFoods = foods.filter(food => {
    if (activeTab === 'favorites' && !food.isFavorite) return false;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || food.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleAddToLog = (food: FoodItem, quantity: number, category: MealCategory) => {
    addMeal({
      name: food.name,
      category,
      calories: food.calories * quantity,
      protein: food.protein * quantity,
      carbs: food.carbs * quantity,
      fat: food.fat * quantity,
      fiber: (food.fiber || 0) * quantity
    });

    setToastMessage(`Added ${quantity}x ${food.name} to ${category}!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="flex flex-col gap-space-lg pb-12">
      {/* Search Input & Barcode Scanner Trigger (Matching Stitch Screen 03) */}
      <div className="flex flex-col gap-space-sm">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search food (e.g., Dal, Paneer, Oats)..."
            className="w-full h-12 pl-12 pr-12 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 text-body-md transition-all shadow-sm border border-surface-container-high/40"
          />
          <button
            type="button"
            onClick={() => setShowBarcodeModal(true)}
            className="absolute right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
            title="Scan barcode"
          >
            <span className="material-symbols-outlined text-[18px]">barcode_scanner</span>
          </button>
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex gap-space-sm overflow-x-auto pb-1 -mx-space-lg px-space-lg no-scrollbar">
          {categories.map(cat => (
            <FilterPill
              key={cat.id}
              label={cat.label}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Tab Selector: Explore vs Favorites (Matching Stitch Screen 03) */}
      <div className="flex bg-surface-container-low p-1 rounded-xl border border-surface-container-high/40">
        <button
          type="button"
          onClick={() => setActiveTab('explore')}
          className={`flex-1 py-2 text-label-md font-semibold rounded-lg transition-all ${
            activeTab === 'explore'
              ? 'bg-surface text-on-surface shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Explore &amp; Log
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 py-2 text-label-md font-semibold rounded-lg transition-all ${
            activeTab === 'favorites'
              ? 'bg-surface text-on-surface shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          My Favorites ({favoritesCount})
        </button>
      </div>

      {/* Feedback Toast */}
      {toastMessage && (
        <div className="bg-primary text-on-primary text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Food List Container */}
      <div className="flex flex-col gap-space-md">
        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToLog={handleAddToLog}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <div className="bg-surface-container-lowest p-8 rounded-xl text-center flex flex-col items-center gap-2 border border-surface-container-high/40">
            <span className="material-symbols-outlined text-[40px] text-outline">search_off</span>
            <h4 className="text-headline-sm font-headline font-semibold text-on-surface">No foods found</h4>
            <p className="text-body-sm text-outline">
              Try a different keyword or switch categories.
            </p>
          </div>
        )}
      </div>

      {/* Barcode Scanner Mock Modal */}
      {showBarcodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-sm w-full p-6 flex flex-col gap-4 shadow-xl border border-surface-container-high">
            <div className="flex justify-between items-center">
              <h3 className="text-headline-sm font-headline font-bold text-on-surface">
                Barcode Scanner
              </h3>
              <button
                type="button"
                onClick={() => setShowBarcodeModal(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="h-44 bg-surface-container-lowest rounded-xl border-2 border-dashed border-primary flex flex-col items-center justify-center gap-2 text-center p-4">
              <span className="material-symbols-outlined text-[48px] text-primary animate-pulse">
                barcode_scanner
              </span>
              <p className="text-sm font-medium text-on-surface-variant">
                Point camera at nutrition barcode on packaging
              </p>
              <span className="text-xs text-outline">
                (Simulated scanner ready)
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowBarcodeModal(false);
                setSearchQuery('Dal Makhani');
              }}
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-headline font-bold text-sm hover:bg-primary-container transition-all"
            >
              Simulate Scan Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
