export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type FitnessGoal = 'Fat loss' | 'Maintenance' | 'Muscle gain';

export type SexType = 'MALE' | 'FEMALE' | 'OTHER';

export type ActivityLevel = 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Athlete';

export type MacroType = 'CALORIES' | 'PROTEIN' | 'CARBS' | 'FAT';

export type ScannerState = 'IDLE' | 'SCANNING' | 'RESULT' | 'USER_REVIEW' | 'CONFIRMATION';

export type AppTheme = 'dark' | 'light' | 'auto';
export type AppAccent = '#C7F464' | '#4F8CFF' | '#38bdf8' | '#34d399' | '#a78bfa';
export type AppFont = 'Geist' | 'Inter' | 'System';

export interface AppearanceSettings {
  theme: AppTheme;
  accent: AppAccent;
  font: AppFont;
}

export interface WeightEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weight: number; // in kg (canonical)
  note?: string;
}

export interface FoodIngredientItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
}

export interface LoggedMeal {
  id: string;
  name: string;
  category: MealCategory;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  time?: string;
  image?: string;
  items?: FoodIngredientItem[];
}

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  category: string;
  image?: string;
  isFavorite?: boolean;
}

export interface NutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number; // in Litres (e.g. 3.5)
  fiber?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  isPro: boolean;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  sex: SexType;
  activityLevel: ActivityLevel;
  dietaryPreferences: string[];
  goal: string;
  dailyCalories: number;
  macroSplit: {
    protein: number;
    carbs: number;
    fat: number;
  };
  unit: 'metric' | 'imperial';
  notifications: boolean;
  isOnboarded: boolean;
}

export interface ScanResult {
  id: string;
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
}

export interface DayProgressData {
  date: string;
  dayShort: string;
  dayNum: string;
  calories: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  isActive?: boolean;
}
