import { FoodItem, LoggedMeal, NutritionTargets, UserProfile, ScanResult, DayProgressData } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Alex Morgan",
  email: "alex.m@nutritrack.ai",
  isPro: true,
  age: 28,
  height: 178,
  weight: 68.2,
  goal: "fat-loss",
  restrictions: ["Gluten-Free", "Nut Allergy"],
  unit: "metric",
  notifications: true
};

export const INITIAL_TARGETS: NutritionTargets = {
  calories: 2200,
  protein: 160,
  carbs: 240,
  fat: 70,
  water: 2500,
  fiber: 30
};

export const INITIAL_MEALS: LoggedMeal[] = [
  {
    id: "meal-b-1",
    name: "Oats, Banana & Almond Milk",
    category: "breakfast",
    calories: 420,
    protein: 14,
    carbs: 68,
    fat: 8,
    fiber: 9,
    time: "8:15 AM",
    items: [
      { name: "Rolled Oats", portion: "60g", calories: 230, protein: 8, carbs: 40, fat: 4 },
      { name: "Fresh Banana", portion: "1 medium (110g)", calories: 105, protein: 1, carbs: 27, fat: 0 },
      { name: "Unsweetened Almond Milk", portion: "240ml", calories: 85, protein: 5, carbs: 1, fat: 4 }
    ]
  },
  {
    id: "meal-l-1",
    name: "Grilled Chicken, Rice & Greens",
    category: "lunch",
    calories: 680,
    protein: 52,
    carbs: 72,
    fat: 18,
    fiber: 7,
    time: "1:00 PM",
    items: [
      { name: "Herb Grilled Chicken Breast", portion: "180g", calories: 310, protein: 42, carbs: 0, fat: 6 },
      { name: "Jasmine Rice", portion: "180g", calories: 240, protein: 4, carbs: 54, fat: 1 },
      { name: "Steamed Broccoli & Carrots", portion: "120g", calories: 70, protein: 3, carbs: 12, fat: 1 },
      { name: "Olive Oil Drizzle", portion: "7ml", calories: 60, protein: 0, carbs: 0, fat: 7 }
    ]
  },
  {
    id: "meal-s-1",
    name: "Organic Honeycrisp Apple",
    category: "snack",
    calories: 95,
    protein: 0,
    carbs: 25,
    fat: 0,
    fiber: 4,
    time: "4:30 PM",
    items: [
      { name: "Honeycrisp Apple", portion: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 }
    ]
  }
];

export const MOCK_FOOD_DATABASE: FoodItem[] = [
  {
    id: "f-1",
    name: "Dal Makhani",
    portion: "1 bowl (250g)",
    calories: 320,
    protein: 12,
    carbs: 35,
    fat: 14,
    fiber: 9,
    category: "indian",
    isFavorite: true
  },
  {
    id: "f-2",
    name: "Rolled Oats with Berries",
    portion: "1 bowl (200g)",
    calories: 250,
    protein: 8,
    carbs: 45,
    fat: 4,
    fiber: 8,
    category: "breakfast",
    isFavorite: true
  },
  {
    id: "f-3",
    name: "Grilled Paneer Tikka Salad",
    portion: "1 plate (220g)",
    calories: 380,
    protein: 22,
    carbs: 14,
    fat: 26,
    fiber: 6,
    category: "indian",
    isFavorite: true
  },
  {
    id: "f-4",
    name: "Grilled Chicken Breast",
    portion: "150g",
    calories: 248,
    protein: 46,
    carbs: 0,
    fat: 5,
    fiber: 0,
    category: "protein",
    isFavorite: false
  },
  {
    id: "f-5",
    name: "Brown Basmati Rice",
    portion: "1 cup cooked (150g)",
    calories: 170,
    protein: 4,
    carbs: 36,
    fat: 1.5,
    fiber: 3,
    category: "lunch",
    isFavorite: false
  },
  {
    id: "f-6",
    name: "Greek Yogurt (Non-Fat)",
    portion: "1 cup (200g)",
    calories: 130,
    protein: 22,
    carbs: 7,
    fat: 0,
    fiber: 0,
    category: "protein",
    isFavorite: false
  },
  {
    id: "f-7",
    name: "Sourdough Bread Toast",
    portion: "2 slices (80g)",
    calories: 180,
    protein: 6,
    carbs: 36,
    fat: 1,
    fiber: 2,
    category: "breakfast",
    isFavorite: false
  },
  {
    id: "f-8",
    name: "Boiled Eggs (2 Large)",
    portion: "100g",
    calories: 140,
    protein: 13,
    carbs: 1,
    fat: 10,
    fiber: 0,
    category: "breakfast",
    isFavorite: false
  },
  {
    id: "f-9",
    name: "Steamed Salmon Fillet",
    portion: "170g",
    calories: 340,
    protein: 34,
    carbs: 0,
    fat: 22,
    fiber: 0,
    category: "dinner",
    isFavorite: false
  },
  {
    id: "f-10",
    name: "Mixed Green Salad with Olive Oil",
    portion: "150g",
    calories: 110,
    protein: 2,
    carbs: 5,
    fat: 10,
    fiber: 3,
    category: "dinner",
    isFavorite: false
  },
  {
    id: "f-11",
    name: "Roasted Almonds",
    portion: "30g (handful)",
    calories: 175,
    protein: 6,
    carbs: 6,
    fat: 15,
    fiber: 3,
    category: "snacks",
    isFavorite: false
  }
];

export const MOCK_SCAN_RESULT: ScanResult = {
  id: "scan-mock-chicken-bowl",
  name: "Grilled Chicken Bowl",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  healthScore: "A",
  healthScoreNum: 92,
  calories: 660,
  protein: 42,
  carbs: 65,
  fat: 16,
  fiber: 8,
  sugar: 4,
  sodium: 480,
  glycemicIndex: "Low (38)",
  boundingBoxes: [
    { label: "Chicken", confidence: 92, weight: "150g", kcal: 320, top: "28%", left: "22%", width: "42%", height: "35%" },
    { label: "Rice", confidence: 88, weight: "200g", kcal: 260, top: "45%", left: "58%", width: "35%", height: "32%" },
    { label: "Veg", confidence: 84, weight: "100g", kcal: 80, top: "18%", left: "55%", width: "32%", height: "25%" }
  ],
  items: [
    { name: "Grilled Chicken Breast", portion: "150g", calories: 320, protein: 35, carbs: 0, fat: 5, confidence: 92 },
    { name: "Jasmine Rice", portion: "200g", calories: 260, protein: 4, carbs: 54, fat: 1, confidence: 88 },
    { name: "Steamed Vegetables (Broccoli & Carrot)", portion: "100g", calories: 80, protein: 3, carbs: 11, fat: 0.5, confidence: 84 }
  ]
};

export const MOCK_PROGRESS_7D: DayProgressData[] = [
  { date: "2026-09-10", dayShort: "M", calories: 1950, targetCalories: 2100, protein: 140, carbs: 215, fat: 58, water: 2200 },
  { date: "2026-09-11", dayShort: "T", calories: 2080, targetCalories: 2100, protein: 152, carbs: 220, fat: 64, water: 2400 },
  { date: "2026-09-12", dayShort: "W", calories: 2140, targetCalories: 2100, protein: 158, carbs: 230, fat: 68, water: 2600 },
  { date: "2026-09-13", dayShort: "T", calories: 1990, targetCalories: 2100, protein: 144, carbs: 205, fat: 60, water: 2100 },
  { date: "2026-09-14", dayShort: "F", calories: 2050, targetCalories: 2100, protein: 148, carbs: 210, fat: 62, water: 2500 },
  { date: "2026-09-15", dayShort: "S", calories: 2220, targetCalories: 2100, protein: 135, carbs: 250, fat: 74, water: 2000 },
  { date: "2026-09-16", dayShort: "S", calories: 1920, targetCalories: 2100, protein: 142, carbs: 195, fat: 59, water: 2500 }
];
