import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LoggedMeal,
  NutritionTargets,
  UserProfile,
  MacroType,
  MealCategory,
  FoodIngredientItem,
  WeightEntry,
  AppearanceSettings
} from '../types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_TARGETS,
  INITIAL_MEALS,
  INITIAL_WEIGHT_HISTORY,
  INITIAL_APPEARANCE
} from '../data/mockData';

interface NutritionContextType {
  userProfile: UserProfile;
  targets: NutritionTargets;
  meals: LoggedMeal[];
  waterIntake: number; // in Litres
  streak: number;
  selectedMacro: MacroType;
  setSelectedMacro: (macro: MacroType) => void;
  weightHistory: WeightEntry[];
  appearance: AppearanceSettings;
  updateAppearance: (settings: Partial<AppearanceSettings>) => void;
  addWeightEntry: (weight: number, date?: string, note?: string) => void;
  deleteWeightEntry: (id: string) => void;
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  remainingCalories: number;
  caloriePercent: number;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  addMeal: (mealData: {
    name: string;
    category: MealCategory;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    image?: string;
    items?: FoodIngredientItem[];
  }) => void;
  deleteMeal: (id: string) => void;
  updateMealItem: (mealId: string, itemIndex: number, updatedItem: Partial<FoodIngredientItem>) => void;
  deleteMealItem: (mealId: string, itemIndex: number) => void;
  addMealItem: (mealId: string, item: FoodIngredientItem) => void;
  addWater: (amount?: number) => void;
  updateTargets: (newTargets: Partial<NutritionTargets>) => void;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  resetToDefaults: () => void;
}

const STORAGE_VERSION = 'v2';
const KEY_PREFIX = `nutritrack_${STORAGE_VERSION}_`;

const safeLoadProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}profile`);
    if (!raw) return INITIAL_USER_PROFILE;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        ...INITIAL_USER_PROFILE,
        ...parsed,
        name: typeof parsed.name === 'string' && parsed.name.trim() ? parsed.name.trim() : INITIAL_USER_PROFILE.name
      };
    }
    return INITIAL_USER_PROFILE;
  } catch {
    return INITIAL_USER_PROFILE;
  }
};

const safeLoadTargets = (): NutritionTargets => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}targets`);
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

const recalculateMeal = (meal: LoggedMeal): LoggedMeal => {
  if (!meal.items || meal.items.length === 0) return meal;
  const totals = meal.items.reduce(
    (acc, it) => ({
      calories: acc.calories + (it.calories || 0),
      protein: acc.protein + (it.protein || 0),
      carbs: acc.carbs + (it.carbs || 0),
      fat: acc.fat + (it.fat || 0)
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  return {
    ...meal,
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    fat: parseFloat(totals.fat.toFixed(1))
  };
};

const safeLoadMeals = (): LoggedMeal[] => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}meals`);
    if (!raw) return INITIAL_MEALS.map(recalculateMeal);
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(recalculateMeal);
    }
    return INITIAL_MEALS.map(recalculateMeal);
  } catch {
    return INITIAL_MEALS.map(recalculateMeal);
  }
};

const safeLoadWater = (): number => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}water`);
    const num = Number(raw);
    return isNaN(num) || num < 0 ? 2.8 : Math.min(10, num);
  } catch {
    return 2.8;
  }
};

const safeLoadSelectedMacro = (): MacroType => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}selected_macro`) as MacroType;
    if (raw && ['CALORIES', 'PROTEIN', 'CARBS', 'FAT'].includes(raw)) {
      return raw;
    }
    return 'PROTEIN';
  } catch {
    return 'PROTEIN';
  }
};

const safeLoadWeightHistory = (): WeightEntry[] => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}weight_history`);
    if (!raw) return INITIAL_WEIGHT_HISTORY;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_WEIGHT_HISTORY;
  } catch {
    return INITIAL_WEIGHT_HISTORY;
  }
};

const safeLoadAppearance = (): AppearanceSettings => {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}appearance`);
    if (!raw) return INITIAL_APPEARANCE;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return { ...INITIAL_APPEARANCE, ...parsed };
    }
    return INITIAL_APPEARANCE;
  } catch {
    return INITIAL_APPEARANCE;
  }
};

const NutritionContext = createContext<NutritionContextType | null>(null);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(safeLoadProfile);
  const [targets, setTargets] = useState<NutritionTargets>(safeLoadTargets);
  const [meals, setMeals] = useState<LoggedMeal[]>(safeLoadMeals);
  const [waterIntake, setWaterIntake] = useState<number>(safeLoadWater);
  const [selectedMacro, setSelectedMacro] = useState<MacroType>(safeLoadSelectedMacro);
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>(safeLoadWeightHistory);
  const [appearance, setAppearance] = useState<AppearanceSettings>(safeLoadAppearance);
  const [streak] = useState<number>(12);

  // Apply appearance theme & CSS vars
  useEffect(() => {
    const root = document.documentElement;
    if (appearance.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (appearance.theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      // auto
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    root.style.setProperty('--accent-color', appearance.accent);
    localStorage.setItem(`${KEY_PREFIX}appearance`, JSON.stringify(appearance));
  }, [appearance]);

  // Sync state to versioned localStorage
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
    localStorage.setItem(`${KEY_PREFIX}water`, waterIntake.toString());
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem(`${KEY_PREFIX}selected_macro`, selectedMacro);
  }, [selectedMacro]);

  useEffect(() => {
    localStorage.setItem(`${KEY_PREFIX}weight_history`, JSON.stringify(weightHistory));
  }, [weightHistory]);

  // Consumed is strictly the dynamic sum of all meals
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

  const completeOnboarding = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...data,
      isOnboarded: true
    }));
  };

  const addMeal = (mealData: {
    name: string;
    category: MealCategory;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    image?: string;
    items?: FoodIngredientItem[];
  }) => {
    const rawMeal: LoggedMeal = {
      id: `meal-${Date.now()}`,
      name: mealData.name,
      category: mealData.category,
      calories: Math.round(mealData.calories),
      protein: Math.round(mealData.protein),
      carbs: Math.round(mealData.carbs),
      fat: parseFloat(mealData.fat.toFixed(1)),
      fiber: mealData.fiber || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: mealData.image,
      items: mealData.items
    };

    const calculatedMeal = recalculateMeal(rawMeal);
    setMeals(prev => [calculatedMeal, ...prev]);
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  // Modify individual meal items (used by MealDetail and FoodLog editing)
  const updateMealItem = (mealId: string, itemIndex: number, updatedItem: Partial<FoodIngredientItem>) => {
    setMeals(prev =>
      prev.map(meal => {
        if (meal.id !== mealId || !meal.items) return meal;
        const newItems = [...meal.items];
        newItems[itemIndex] = { ...newItems[itemIndex], ...updatedItem };
        return recalculateMeal({ ...meal, items: newItems });
      })
    );
  };

  const deleteMealItem = (mealId: string, itemIndex: number) => {
    setMeals(prev =>
      prev.map(meal => {
        if (meal.id !== mealId || !meal.items) return meal;
        const newItems = meal.items.filter((_, idx) => idx !== itemIndex);
        return recalculateMeal({ ...meal, items: newItems });
      })
    );
  };

  const addMealItem = (mealId: string, item: FoodIngredientItem) => {
    setMeals(prev =>
      prev.map(meal => {
        if (meal.id !== mealId) return meal;
        const newItems = [...(meal.items || []), item];
        return recalculateMeal({ ...meal, items: newItems });
      })
    );
  };

  const addWater = (amount = 0.25) => {
    setWaterIntake(prev => parseFloat((Math.min(10, Math.max(0, prev + amount))).toFixed(2)));
  };

  const updateTargets = (newTargets: Partial<NutritionTargets>) => {
    setTargets(prev => ({ ...prev, ...newTargets }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...newProfile };
      // If unit changed, update heightUnit and weightUnit to match
      if (newProfile.unit && newProfile.unit !== prev.unit) {
        if (newProfile.unit === 'imperial') {
          updated.heightUnit = 'ft';
          updated.weightUnit = 'lb';
        } else {
          updated.heightUnit = 'cm';
          updated.weightUnit = 'kg';
        }
      }
      return updated;
    });
  };

  const addWeightEntry = (weight: number, date?: string, note?: string) => {
    const newEntry: WeightEntry = {
      id: `w-${Date.now()}`,
      date: date || new Date().toISOString().split('T')[0],
      weight: parseFloat(weight.toFixed(1)),
      note
    };

    setWeightHistory(prev => [newEntry, ...prev]);
    // Also update current profile weight
    setUserProfile(prev => ({ ...prev, weight: parseFloat(weight.toFixed(1)) }));
  };

  const deleteWeightEntry = (id: string) => {
    setWeightHistory(prev => prev.filter(w => w.id !== id));
  };

  const updateAppearance = (settings: Partial<AppearanceSettings>) => {
    setAppearance(prev => ({ ...prev, ...settings }));
  };

  const resetToDefaults = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setTargets(INITIAL_TARGETS);
    setMeals(INITIAL_MEALS.map(recalculateMeal));
    setWaterIntake(2.8);
    setSelectedMacro('PROTEIN');
    setWeightHistory(INITIAL_WEIGHT_HISTORY);
    setAppearance(INITIAL_APPEARANCE);
  };

  return (
    <NutritionContext.Provider
      value={{
        userProfile,
        targets,
        meals,
        waterIntake,
        streak,
        selectedMacro,
        setSelectedMacro,
        weightHistory,
        appearance,
        updateAppearance,
        addWeightEntry,
        deleteWeightEntry,
        consumed,
        remainingCalories,
        caloriePercent,
        completeOnboarding,
        addMeal,
        deleteMeal,
        updateMealItem,
        deleteMealItem,
        addMealItem,
        addWater,
        updateTargets,
        updateProfile,
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
