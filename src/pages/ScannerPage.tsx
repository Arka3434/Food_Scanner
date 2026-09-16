import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../context/NutritionContext';
import { ScannerViewfinder } from '../components/scanner/ScannerViewfinder';
import { MOCK_SCAN_RESULT } from '../data/mockData';
import { MealCategory, DetectedFoodItem } from '../types';

export const ScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { addMeal } = useNutrition();

  const [scanData, setScanData] = useState(MOCK_SCAN_RESULT);
  const [items, setItems] = useState<DetectedFoodItem[]>(MOCK_SCAN_RESULT.items);
  const [isScanning, setIsScanning] = useState(false);
  const [targetCategory, setTargetCategory] = useState<MealCategory>('lunch');
  const [showAddedNotice, setShowAddedNotice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Portion editing
  const handlePortionChange = (index: number, newGrams: number) => {
    setItems(prev => {
      const updated = [...prev];
      const item = updated[index];
      const baseRatio = Math.max(0.1, newGrams / 100);
      updated[index] = {
        ...item,
        portion: `${newGrams}g`,
        calories: Math.round(item.calories * (newGrams / parseInt(item.portion || '100'))),
        protein: Math.round(item.protein * (newGrams / parseInt(item.portion || '100'))),
        carbs: Math.round(item.carbs * (newGrams / parseInt(item.portion || '100'))),
        fat: Math.round(item.fat * (newGrams / parseInt(item.portion || '100')))
      };
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    const newItem: DetectedFoodItem = {
      name: "Avocado Slices",
      portion: "50g",
      calories: 80,
      protein: 1,
      carbs: 4,
      fat: 7,
      confidence: 90
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setItems(MOCK_SCAN_RESULT.items);
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setIsScanning(true);
        setScanData(prev => ({ ...prev, image: reader.result as string }));
        setTimeout(() => {
          setIsScanning(false);
        }, 1400);
      }
    };
    reader.readAsDataURL(file);
  };

  // Re-calculate total estimated nutrition from current items
  const totalKcal = items.reduce((s, i) => s + (i.calories || 0), 0);
  const totalProtein = items.reduce((s, i) => s + (i.protein || 0), 0);
  const totalCarbs = items.reduce((s, i) => s + (i.carbs || 0), 0);
  const totalFat = items.reduce((s, i) => s + (i.fat || 0), 0);
  const totalFiber = 8;

  const handleAddToMeal = () => {
    addMeal({
      name: scanData.name,
      category: targetCategory,
      calories: totalKcal,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      fiber: totalFiber,
      items: items.map(i => ({
        name: i.name,
        portion: i.portion,
        calories: i.calories,
        protein: i.protein,
        carbs: i.carbs,
        fat: i.fat
      }))
    });

    setShowAddedNotice(true);
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  return (
    <div className="flex flex-col gap-space-lg pb-12">
      {/* Mock AI Disclaimer Notice Banner */}
      <div className="bg-primary-fixed/20 border border-primary-fixed-dim/60 rounded-xl px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>Simulation Mode: Displaying mock AI detection results.</span>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-primary text-xs font-bold hover:underline"
        >
          Change Image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Viewfinder Card (Directly Matching Stitch Screen 01) */}
      <ScannerViewfinder
        imageSrc={scanData.image}
        isScanning={isScanning}
        detectedCount={items.length}
        mealTitle={scanData.name}
        boundingBoxes={scanData.boundingBoxes}
        onRescan={handleRescan}
        onToggleUpload={() => fileInputRef.current?.click()}
      />

      {/* Detected Foods Review Section (Matching Stitch Screen 01) */}
      <div className="flex flex-col gap-space-md">
        <div className="flex justify-between items-center">
          <h2 className="text-headline-sm font-headline font-semibold text-on-surface">
            Detected Foods
          </h2>
          <button
            type="button"
            onClick={handleAddItem}
            className="text-primary text-label-md font-medium flex items-center gap-space-xs hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add another item
          </button>
        </div>

        {/* List of Detected Food Cards */}
        <div className="flex flex-col gap-3">
          {items.map((item, idx) => {
            const grams = parseInt(item.portion) || 100;
            return (
              <div
                key={idx}
                className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between gap-space-md shadow-sm border border-surface-container-high/40"
              >
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-primary-fixed/25 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]">restaurant</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-label-md font-headline font-semibold text-on-surface truncate">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-space-sm text-body-sm text-outline">
                      <span>{item.calories} kcal</span>
                      <span>•</span>
                      <span className="text-primary font-medium">{item.confidence}% confidence</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm flex-shrink-0">
                  <div className="flex items-center bg-surface rounded-lg px-2 py-1 shadow-sm border border-surface-container-high/50">
                    <input
                      type="number"
                      value={grams}
                      onChange={(e) => handlePortionChange(idx, Number(e.target.value) || 0)}
                      className="w-12 text-center bg-transparent text-on-surface font-semibold text-sm focus:outline-none"
                    />
                    <span className="text-outline text-body-sm">g</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="w-9 h-9 rounded-lg text-error hover:bg-error-container/50 flex items-center justify-center transition-colors"
                    title="Delete item"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated Meal Nutrition Summary Card (Matching Stitch Screen 01) */}
      <div className="bg-surface-container p-5 rounded-xl flex flex-col gap-space-md shadow-sm border border-surface-container-high/60">
        <div className="flex justify-between items-center">
          <h3 className="text-headline-sm font-headline font-semibold text-on-surface">
            Estimated Nutrition
          </h3>
          <span className="bg-primary-container text-on-primary-container text-label-sm px-2.5 py-1 rounded-full font-bold">
            Total: {totalKcal} kcal
          </span>
        </div>

        {/* Macro Breakdown Grid */}
        <div className="grid grid-cols-4 gap-space-sm">
          <div className="bg-surface p-3 rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-body-sm text-outline font-medium">Protein</span>
            <span className="text-headline-sm font-headline text-on-surface font-bold mt-1">
              {totalProtein}g
            </span>
          </div>
          <div className="bg-surface p-3 rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-body-sm text-outline font-medium">Carbs</span>
            <span className="text-headline-sm font-headline text-on-surface font-bold mt-1">
              {totalCarbs}g
            </span>
          </div>
          <div className="bg-surface p-3 rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-body-sm text-outline font-medium">Fat</span>
            <span className="text-headline-sm font-headline text-on-surface font-bold mt-1">
              {totalFat}g
            </span>
          </div>
          <div className="bg-surface p-3 rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-body-sm text-outline font-medium">Fiber</span>
            <span className="text-headline-sm font-headline text-on-surface font-bold mt-1">
              {totalFiber}g
            </span>
          </div>
        </div>

        {/* Macro Distribution Bar */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex justify-between text-body-sm text-outline font-medium">
            <span>Macro Split</span>
            <span>
              P: {Math.round((totalProtein * 4 / Math.max(1, totalKcal)) * 100)}% • 
              C: {Math.round((totalCarbs * 4 / Math.max(1, totalKcal)) * 100)}% • 
              F: {Math.round((totalFat * 9 / Math.max(1, totalKcal)) * 100)}%
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-surface-variant overflow-hidden flex">
            <div className="bg-primary h-full" style={{ width: '30%' }} />
            <div className="bg-secondary-fixed-dim h-full" style={{ width: '47%' }} />
            <div className="bg-tertiary-container h-full" style={{ width: '23%' }} />
          </div>
        </div>
      </div>

      {/* Meal Selector & Actions (Matching Stitch Screen 01) */}
      <div className="flex flex-col gap-space-md pt-2">
        <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-xl">
          <span className="text-body-md text-on-surface-variant font-medium px-2">
            Log to:
          </span>
          <div className="flex gap-space-xs">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTargetCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-label-sm font-semibold capitalize transition-all ${
                  targetCategory === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface text-on-surface shadow-xs hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-body-sm text-outline text-center px-4">
          AI estimates should be reviewed before saving. Nutrition values are calculated via USDA reference datasets.
        </p>

        <button
          type="button"
          onClick={handleAddToMeal}
          disabled={showAddedNotice}
          className="w-full h-14 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-space-sm shadow-stitch-btn hover:bg-primary-container transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[24px]">
            {showAddedNotice ? 'check_circle' : 'check_circle'}
          </span>
          {showAddedNotice ? 'Saved to Today!' : `Add to ${targetCategory.charAt(0).toUpperCase() + targetCategory.slice(1)}`}
        </button>
      </div>
    </div>
  );
};
