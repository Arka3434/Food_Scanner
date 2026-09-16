import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, LoggedMeal, NutritionTargets, UserProfile, MealCategory } from '../types';
import { INITIAL_USER_PROFILE, INITIAL_TARGETS, INITIAL_MEALS, MOCK_FOOD_DATABASE } from '../data/mockData';

interface NutritionContextType {
  userProfile: UserProfile;
  targets: NutritionTargets;
  meals: LoggedMeal[];
  foods: FoodItem[];
  waterIntake: number;
  streak: number;
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  remainingCalories: number;
  caloriePercent: number;
  addMeal: (meal: { name: string; category: MealCategory; calories: number; protein: number; carbs: number; fat: number; fiber?: number; items?: any[] }) => void;
  deleteMeal: (id: string) => void;
  addWater: (amount?: number) => void;
  updateTargets: (newTargets: Partial<NutritionTargets>) => void;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  toggleFavorite: (foodId: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_VERSION = 'v1';
const KEY_PREFIX = `nutritrack_${STORAGE_VERSION}_`;

// Safe loaders with validation and fallback to guarantee valid state
const safeLoadProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}profile`) || localStorage.getItem('nutritrack_profile');
    if (!raw) return INITIAL_USER_PROFILE;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && typeof parsed.name === 'string' && parsed.name.trim().length > 0) {
      return {
        ...INITIAL_USER_PROFILE,
        ...parsed,
        name: parsed.name.trim()
      };
    }
    return INITIAL_USER_PROFILE;
  } catch {
    return INITIAL_USER_PROFILE;
  }
};

const safeLoadTargets = (): NutritionTargets => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}targets`) || localStorage.getItem('nutritrack_targets');
    if (!raw) return INITIAL_TARGETS;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && typeof parsed.calories === 'number' && parsed.calories > 0) {
      return { ...INITIAL_TARGETS, ...parsed };
    }
    return INITIAL_TARGETS;
  } catch {
    return INITIAL_TARGETS;
  }
};

const safeLoadMeals = (): LoggedMeal[] => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}meals`) || localStorage.getItem('nutritrack_meals');
    if (!raw) return INITIAL_MEALS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_MEALS;
  } catch {
    return INITIAL_MEALS;
  }
};

const safeLoadFoods = (): FoodItem[] => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}foods`) || localStorage.getItem('nutritrack_foods');
    if (!raw) return MOCK_FOOD_DATABASE;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return MOCK_FOOD_DATABASE;
  } catch {
    return MOCK_FOOD_DATABASE;
  }
};

const safeLoadWater = (): number => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}water`) || localStorage.getItem('nutritrack_water');
    const num = Number(raw);
    return isNaN(num) || num < 0 ? 1800 : num;
  } catch {
    return 1800;
  }
};

const NutritionContext = createContext<NutritionContextType | null>(null);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(safeLoadProfile);
  const [targets, setTargets] = useState<NutritionTargets>(safeLoadTargets);
  const [meals, setMeals] = useState<LoggedMeal[]>(safeLoadMeals);
  const [foods, setFoods] = useState<FoodItem[]>(safeLoadFoods);
  const [waterIntake, setWaterIntake] = useState<number>(safeLoadWater);
  const [streak] = useState<number>(12);

  // Local storage persistence under versioned keys
  useEffect(() => {
    localStorage.setItem(`${KEY_PREFIX}profile`, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(`${KEY_PREFIX}targets`, JSON.stringify(targets));
  }, [targets]);

  useEffect(() => {
    localStorage.setItem(`${KEY_PREFIX}meals`, JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem(`${KEY_PREFIX}foods`, JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem(`${KEY_PREFIX}water`, waterIntake.toString());
  }, [waterIntake]);

  // Derived totals
  const consumed = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fat: acc.fat + (meal.fat || 0),
      fiber: acc.fiber + (meal.fiber || 0)
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const remainingCalories = Math.max(0, targets.calories - consumed.calories);
  const caloriePercent = Math.min(100, Math.round((consumed.calories / targets.calories) * 100));

  const addMeal = (mealData: { name: string; category: MealCategory; calories: number; protein: number; carbs: number; fat: number; fiber?: number; items?: any[] }) => {
    const newMeal: LoggedMeal = {
      id: `meal-${Date.now()}`,
      name: mealData.name,
      category: mealData.category,
      calories: Math.round(mealData.calories),
      protein: Math.round(mealData.protein),
      carbs: Math.round(mealData.carbs),
      fat: Math.round(mealData.fat),
      fiber: mealData.fiber || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: mealData.items
    };

    setMeals(prev => [newMeal, ...prev]);
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const addWater = (amount = 250) => {
    setWaterIntake(prev => Math.min(5000, prev + amount));
  };

  const updateTargets = (newTargets: Partial<NutritionTargets>) => {
    setTargets(prev => ({ ...prev, ...newTargets }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...newProfile }));
  };

  const toggleFavorite = (foodId: string) => {
    setFoods(prev =>
      prev.map(f => (f.id === foodId ? { ...f, isFavorite: !f.isFavorite } : f))
    );
  };

  const resetToDefaults = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setTargets(INITIAL_TARGETS);
    setMeals(INITIAL_MEALS);
    setFoods(MOCK_FOOD_DATABASE);
    setWaterIntake(1800);
  };

  return (
    <NutritionContext.Provider
      value={{
        userProfile,
        targets,
        meals,
        foods,
        waterIntake,
        streak,
        consumed,
        remainingCalories,
        caloriePercent,
        addMeal,
        deleteMeal,
        addWater,
        updateTargets,
        updateProfile,
        toggleFavorite,
        resetToDefaults
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
