import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';
import { ScanNavIcon } from '../components/common/BottomNavIcons';

export const FoodItemsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(MOCK_FOOD_ITEMS);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks', 'Protein'];

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFoodItems(prev =>
      prev.map(item => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const filteredItems = useMemo(() => {
    return foodItems.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [foodItems, searchQuery, selectedCategory]);

  const favorites = useMemo(() => {
    return foodItems.filter(item => item.isFavorite);
  }, [foodItems]);

  return (
    <div className="flex flex-col relative w-full min-h-screen bg-[#0E0F0D] text-white select-none pb-28 max-w-md mx-auto">
      {/* 1. HEADER */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#0E0F0D]/90 backdrop-blur-xl pt-safe border-b border-white/[0.04]">
        <div className="h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Back to Dashboard"
              onClick={() => navigate('/dashboard')}
              className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors mr-1"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <span className="text-xl font-headline font-bold tracking-tight text-white">Food Items</span>
          </div>
          <button
            type="button"
            aria-label="Profile"
            onClick={() => navigate('/profile')}
            className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center border border-white/10 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-white text-[20px]">person</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-col relative w-full pt-4">
        {/* 2. SEARCH FIELD */}
        <div className="px-6 mb-5">
          <div className="flex items-center bg-[#18181b] h-12 px-4 rounded-xl border border-white/5 focus-within:border-[#4F8CFF]/50 transition-colors">
            <span className="material-symbols-outlined text-[#a1a1aa] mr-3 text-[20px]">search</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder:text-[#71717a] text-sm w-full outline-none font-body"
              placeholder="Search food items or categories..."
              type="text"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#71717a] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. PRIMARY ACTIONS: Scan Food & Add Manually */}
        <div className="px-6 mb-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate('/scan')}
            className="flex items-center justify-center gap-2.5 py-3.5 bg-[#4F8CFF] text-white font-headline font-medium rounded-xl active:scale-95 transition-all shadow-lg shadow-[#4F8CFF]/25 hover:bg-[#3f7de8]"
          >
            <ScanNavIcon className="size-5" />
            <span className="text-sm">Scan Food</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/add-manually')}
            className="flex items-center justify-center gap-2 py-3.5 bg-[#18181b] border border-white/10 text-white font-headline font-medium rounded-xl active:scale-95 transition-all hover:border-white/25 hover:bg-[#202024]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#4F8CFF]">add</span>
            <span className="text-sm">Add Manually</span>
          </button>
        </div>

        {/* 4. FAVORITES SECTION */}
        {favorites.length > 0 && !searchQuery && (
          <div className="mb-7">
            <div className="px-6 mb-3 flex items-center justify-between">
              <h2 className="text-xs font-headline font-semibold tracking-wider text-[#a1a1aa] uppercase">
                Favorites
              </h2>
              <span className="text-xs text-[#4F8CFF] font-medium cursor-pointer">
                {favorites.length} saved
              </span>
            </div>
            <div className="flex overflow-x-auto space-x-3 px-6 pb-2 no-scrollbar">
              {favorites.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/food-detail/${item.id}`)}
                  className="flex-shrink-0 w-32 bg-[#18181b] rounded-xl p-3 flex flex-col relative border border-white/5 hover:border-white/20 active:scale-95 transition-all cursor-pointer group"
                >
                  <button
                    type="button"
                    aria-label="Toggle favorite"
                    onClick={e => handleToggleFavorite(e, item.id)}
                    className="absolute top-2.5 right-2.5 text-[#4F8CFF] z-10"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: item.isFavorite ? '"FILL" 1' : '"FILL" 0' }}
                    >
                      favorite
                    </span>
                  </button>
                  <img
                    src={item.image || '/images/salmon-poke-bowl.jpg'}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover mb-3 bg-[#27272a]"
                  />
                  <span className="text-white text-xs font-medium truncate mb-0.5 group-hover:text-[#4F8CFF] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[#a1a1aa] text-[11px] font-mono">{item.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. CATEGORIES PILLS */}
        <div className="mb-7">
          <div className="px-6 mb-3">
            <h2 className="text-xs font-headline font-semibold tracking-wider text-[#a1a1aa] uppercase">
              Categories
            </h2>
          </div>
          <div className="flex overflow-x-auto space-x-2 px-6 pb-2 no-scrollbar whitespace-nowrap">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#4F8CFF] text-white font-semibold shadow-md shadow-[#4F8CFF]/20'
                      : 'bg-[#18181b] border border-white/5 text-[#a1a1aa] hover:text-white hover:border-white/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. FOOD ITEMS LIST */}
        <div className="px-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-headline font-semibold tracking-wider text-[#a1a1aa] uppercase">
              {searchQuery ? `Search Results (${filteredItems.length})` : 'Recent & Popular'}
            </h2>
          </div>

          <div className="flex flex-col space-y-3">
            {filteredItems.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center p-6 bg-[#18181b] rounded-2xl border border-white/5">
                <span className="material-symbols-outlined text-4xl text-[#71717a] mb-2">
                  search_off
                </span>
                <p className="text-white font-medium text-sm">No food items found</p>
                <p className="text-xs text-[#a1a1aa] mt-1 mb-4">
                  Try searching with a different keyword or create it manually.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/add-manually')}
                  className="px-4 py-2 bg-[#4F8CFF] text-white text-xs font-medium rounded-xl active:scale-95 transition-transform"
                >
                  + Add Custom Food
                </button>
              </div>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/food-detail/${item.id}`)}
                  className="flex flex-col p-3.5 bg-[#18181b] rounded-xl border border-white/5 hover:border-white/15 active:scale-[0.99] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={item.image || '/images/salmon-poke-bowl.jpg'}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#27272a]"
                      />
                      <div>
                        <h4 className="text-[14px] font-bold text-white group-hover:text-[#4F8CFF] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[12px] text-[#a1a1aa] font-mono">{item.portion}</p>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[16px] font-bold text-white block leading-tight">
                        {item.calories}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-wider">
                        KCAL
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.06] my-2.5 w-full"></div>

                  <div className="text-[12px] font-mono flex items-center justify-between px-1">
                    <span className="text-[#C7F464] font-medium">Protein: {item.protein}g</span>
                    <span className="text-white/70">Carbs: {item.carbs}g</span>
                    <span className="text-white/70">Fat: {item.fat}g</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
