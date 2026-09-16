export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type FitnessGoal = 'fat-loss' | 'maintenance' | 'muscle-gain';

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  category: string;
  isFavorite?: boolean;
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
  time: string;
  items?: {
    name: string;
    portion: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
}

export interface NutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number; // ml
  fiber?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  isPro: boolean;
  age: number;
  height: number; // cm
  weight: number; // kg
  goal: FitnessGoal;
  restrictions: string[];
  unit: 'metric' | 'imperial';
  notifications: boolean;
}

export interface DetectedBoundingBox {
  label: string;
  confidence: number;
  weight: string;
  kcal: number;
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface DetectedFoodItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

export interface ScanResult {
  id: string;
  name: string;
  image: string;
  healthScore: 'A' | 'B' | 'C' | 'D' | 'E';
  healthScoreNum: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  glycemicIndex: string;
  boundingBoxes: DetectedBoundingBox[];
  items: DetectedFoodItem[];
}

export interface DayProgressData {
  date: string;
  dayShort: string;
  calories: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}
