import { LoggedMeal, NutritionTargets, UserProfile, ScanResult, DayProgressData, WeightEntry, AppearanceSettings, FoodItem } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Alex Mercer",
  email: "alex.mercer@nutritrack.ai",
  isPro: true,
  age: 24,
  height: 178,
  weight: 68.2,
  heightUnit: 'cm',
  weightUnit: 'kg',
  sex: 'MALE',
  activityLevel: 'Active',
  dietaryPreferences: ['Vegetarian', 'Dairy-free'],
  goal: "Fat loss",
  dailyCalories: 2100,
  macroSplit: {
    protein: 30,
    carbs: 45,
    fat: 25
  },
  unit: "metric",
  notifications: true,
  isOnboarded: false
};

export const INITIAL_TARGETS: NutritionTargets = {
  calories: 2100,
  protein: 160,
  carbs: 220,
  fat: 65,
  water: 3.5, // in Litres
  fiber: 30
};

export const INITIAL_WEIGHT_HISTORY: WeightEntry[] = [
  { id: 'w-1', date: '2026-09-01', weight: 69.8, note: 'Starting weight' },
  { id: 'w-2', date: '2026-09-05', weight: 69.2, note: 'Morning check-in' },
  { id: 'w-3', date: '2026-09-09', weight: 68.9, note: 'Mid-week weigh-in' },
  { id: 'w-4', date: '2026-09-13', weight: 68.5, note: 'Post workout' },
  { id: 'w-5', date: '2026-09-16', weight: 68.2, note: 'Current target check' }
];

export const INITIAL_APPEARANCE: AppearanceSettings = {
  theme: 'dark',
  accent: '#C7F464',
  font: 'Geist'
};

export const INITIAL_MEALS: LoggedMeal[] = [
  {
    id: "meal-breakfast",
    name: "Breakfast",
    category: "breakfast",
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 12,
    fiber: 5,
    time: "8:30 AM",
    items: [
      {
        name: "Greek Yogurt & Berries",
        portion: "1 bowl (200g)",
        calories: 320,
        protein: 16,
        carbs: 42,
        fat: 10,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbwtD3qVjM-ie5wT88Wh2Y3ANuOcYagMniCwsLEDoR3HY5nYc-4x-zCNhVyHEe1iAX2Gix34RVv7V682HabnhKff2-TW4G82jxbCjFN_pt4awwPiBqtokDKOr7lbwLlorxNrIxPBKx3QmVrD6gcOdJQ3fKL7XEA4B0-XdBuBjzoYZ1NVuVH4w0EP8KKd_6NwUAsRJQU2badxgQzgW6OWNuSbG7S06LFO6zb7dfBgueNXJQ3OspIik"
      },
      {
        name: "Espresso",
        portion: "1 cup (60ml)",
        calories: 100,
        protein: 2,
        carbs: 10,
        fat: 2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAULL2YAIDK7tZlkBkKZYASOS1zm18ZhyJ-Q2UPF3zJPVRGyQK7fdau8Wt0k-oh4xIMHXAt99khQzMY8x0huGzkWmwP2r9obl91a93pH7SewaEoTBGxrZ99RMpGb66PqTYI9sOF7uqiu5bkSZQQG094ZTCaGB1-DLA-OGZyJzA4_nE2nwQutFBbMkdo0-TsJgVMlpvbBjEgzVM6j2TM-KVp5XwjU6CC4B2vkTd1PZrOmYwhQWBM9CY"
      }
    ]
  },
  {
    id: "meal-lunch",
    name: "Salmon Poke Bowl",
    category: "lunch",
    calories: 650,
    protein: 45,
    carbs: 41,
    fat: 32.5,
    fiber: 8,
    time: "1:15 PM",
    image: "/images/salmon-poke-bowl.jpg",
    items: [
      {
        name: "Atlantic Salmon",
        portion: "180 g",
        calories: 360,
        protein: 38,
        carbs: 0,
        fat: 22,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF6MMASsEDXY-1_6K1yym6Tycwad5lvUFpe-93NAgw1O9fmyD6F6nPuxwtjAhpWLtMaIF_Ryc0lcmQclukoHrR23WV8muFet-vcTeLqBdgiRTNuzepWr7VoCwuFHlN2a4sqtkKKNZSlARnR2_DOtsDJl650r3DRNw7AL2H7_DS5t4xrXoG9MKLk5vPyoYe0t2Kuz4xmnfqFkCbGmrFkNrQxJe5zKw-T_vbFwCAgFyHjxyPzFd-bIw"
      },
      {
        name: "Sushi Rice",
        portion: "120 g",
        calories: 160,
        protein: 3,
        carbs: 35,
        fat: 0.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH6j3x1m0W2PBiV3Y7hZqG3uuc1PS7-BlCGWxtCr1wMm0pOCaJzVvP-kk6IpAcmrHQUngteNsKUJovVdSOFPhmqC8K9o0SGBtdncYVEtBjODfdbuhLGP-jOcvh3GcsPJnET3Qh2UjqCbeTJfIqEpz5eLZtWMZ_kCFH90TucGYTIyiEneCJitI7thJetblG0YWB-VpZMpKqUvX97XJG-V7fZOO5oXjfNUA5iPmh1zEa7HUo2F2TU8E"
      },
      {
        name: "Avocado & Edamame",
        portion: "80 g",
        calories: 130,
        protein: 4,
        carbs: 6,
        fat: 10,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvVxysI1hkcDDyii0iJHS-mLSQ7uRiVNCuD0x6Q6r1AVdodM6s754WfLjsLWhneRa2RlV1D2T_WvRVkZiOwQSNmhOYAqOGCey8MSgmExuPrjoDSFCbR1xza-p2-FnWlhge_ubywfZ4FKQBFcsFqwk2plGZ3m8KhNG54pbD73h-WrTMQQWzm-L2NqXkQpkw_ozSJsEd0SnDaEIMV9F7Kb4znNdY-Zy6RcUjWh0sATG-dxjy1EF995o"
      }
    ]
  },
  {
    id: "meal-dinner",
    name: "Grilled Chicken Bowl",
    category: "dinner",
    calories: 550,
    protein: 48,
    carbs: 46,
    fat: 9,
    fiber: 6,
    time: "7:45 PM",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFS5WPydXzAZ1KeA6_3Gl1TKbxe8UWdmB32lMKPUhHFTX4o4gvavtoiuq5vWdcZjpwBDrWXcljNA8RywqqxTmaWXlti9ORguXZebhZ5JGDkiuBDUb2vzSDgmB5x_BUpt8LZCHdSym8OQ-W7JGRTzXk0WXevZW32NldDcdXbhJmIrOtgyd3S2JqL6ODfl6s_kocDgQ6QgyPhWr8ysXrQxchVCBDz0AsnS5p6QcjOAyOujotThclJ4w",
    items: [
      {
        name: "Grilled Chicken Breast",
        portion: "180 g",
        calories: 320,
        protein: 42,
        carbs: 0,
        fat: 6
      },
      {
        name: "Brown Jasmine Rice",
        portion: "150 g",
        calories: 160,
        protein: 3,
        carbs: 34,
        fat: 1
      },
      {
        name: "Roasted Seasonal Veggies",
        portion: "100 g",
        calories: 70,
        protein: 3,
        carbs: 12,
        fat: 2
      }
    ]
  }
];

export const MOCK_SCAN_RESULT: ScanResult = {
  id: "scan-salmon-bowl",
  name: "Salmon Poke Bowl",
  confidence: 98,
  calories: 540,
  protein: 42,
  carbs: 48,
  fat: 18,
  image: "/images/salmon-poke-bowl.jpg"
};

export const MOCK_WEEK_LOG: DayProgressData[] = [
  { date: "2026-09-12", dayShort: "M", dayNum: "12", calories: 2100, targetCalories: 2100, protein: 142, carbs: 215, fat: 58, water: 2.8 },
  { date: "2026-09-13", dayShort: "T", dayNum: "13", calories: 2300, targetCalories: 2100, protein: 154, carbs: 228, fat: 66, water: 3.2 },
  { date: "2026-09-14", dayShort: "W", dayNum: "14", calories: 1900, targetCalories: 2100, protein: 138, carbs: 198, fat: 54, water: 2.5 },
  { date: "2026-09-15", dayShort: "T", dayNum: "15", calories: 2050, targetCalories: 2100, protein: 148, carbs: 212, fat: 60, water: 3.0 },
  { date: "2026-09-16", dayShort: "F", dayNum: "16", calories: 1620, targetCalories: 2100, protein: 111, carbs: 139, fat: 53.5, water: 2.8, isActive: true },
  { date: "2026-09-17", dayShort: "S", dayNum: "17", calories: 0, targetCalories: 2100, protein: 0, carbs: 0, fat: 0, water: 0 },
  { date: "2026-09-18", dayShort: "S", dayNum: "18", calories: 0, targetCalories: 2100, protein: 0, carbs: 0, fat: 0, water: 0 }
];

export const MOCK_ANALYTICS_STATS = {
  avgCalories: "2,050",
  caloriesTrend: "-4% vs target",
  avgProtein: "145g",
  proteinStatus: "Goal met",
  avgCarbs: "210g",
  carbsStatus: "On track",
  avgFat: "62g",
  fatStatus: "Optimal range",
  dailyAvgPercent: "98%"
};

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: "food-greek-yogurt",
    name: "Greek Yogurt & Berries",
    portion: "1 bowl (200g)",
    servingUnit: "bowl",
    servingSize: 1,
    calories: 220,
    protein: 18,
    carbs: 24,
    fat: 4,
    fiber: 3,
    category: "Breakfast",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk8WKfP1Efb-Grfwegxc1xyIri6QFgJov3lnqLYbn9iXam9vT8Um4phk_3XMmdGIORAoehXrcaJK_vWYA-yPBCqNvkoFdQpyFP9nm3LpF2ZW7vprv3q9gfyZGC1YL3QjQPhkNBYO1PibwRNjK41-xOgM_Q6kTObr9zI9Ibxu3IlMEtIoKW6YTOuesiB54dv4C-iGA0NtiPCN8ZqhjmvMeAd1McgHAGxj_dOte0si5Vik6lRS4Idu4",
    isFavorite: true
  },
  {
    id: "food-espresso",
    name: "Espresso",
    portion: "1 shot (30ml)",
    servingUnit: "shot",
    servingSize: 1,
    calories: 5,
    protein: 0,
    carbs: 1,
    fat: 0,
    category: "Drinks",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9EnK46kSnWWj9WM6sWshFu7am3PILXsQ9Lw7xxXeKd5sReHdGf_SgxLeHnsF6BoFIUF0pm7wCXmZwD_7LVKoGLwh1eAc44wMDc3Ab3dzf0E-CA73_xYHy0Vr7a6d82f9M3rkI8XXXRVECxmW_QNvsNZZLpOCJShyMMBDZELHKu8wC6uX_F82pD-7PHUOTy60jASD1b9UdmG5_t_yysXt8RzmVdc3akmzZ87lFxuzVIvhYPP1fYR4",
    isFavorite: true
  },
  {
    id: "food-salmon-poke",
    name: "Salmon Poke Bowl",
    portion: "1 regular bowl",
    servingUnit: "bowl",
    servingSize: 1,
    calories: 450,
    protein: 28,
    carbs: 48,
    fat: 14,
    fiber: 6,
    category: "Lunch",
    image: "/images/salmon-poke-bowl.jpg",
    isFavorite: true
  },
  {
    id: "food-chicken-bowl",
    name: "Grilled Chicken Bowl",
    portion: "1 plate (350g)",
    servingUnit: "plate",
    servingSize: 1,
    calories: 550,
    protein: 48,
    carbs: 46,
    fat: 9,
    fiber: 6,
    category: "Dinner",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFS5WPydXzAZ1KeA6_3Gl1TKbxe8UWdmB32lMKPUhHFTX4o4gvavtoiuq5vWdcZjpwBDrWXcljNA8RywqqxTmaWXlti9ORguXZebhZ5JGDkiuBDUb2vzSDgmB5x_BUpt8LZCHdSym8OQ-W7JGRTzXk0WXevZW32NldDcdXbhJmIrOtgyd3S2JqL6ODfl6s_kocDgQ6QgyPhWr8ysXrQxchVCBDz0AsnS5p6QcjOAyOujotThclJ4w",
    isFavorite: false
  },
  {
    id: "food-avocado-edamame",
    name: "Avocado & Edamame",
    portion: "1 plate (150g)",
    servingUnit: "plate",
    servingSize: 1,
    calories: 220,
    protein: 6,
    carbs: 12,
    fat: 18,
    fiber: 7,
    category: "Snacks",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvVxysI1hkcDDyii0iJHS-mLSQ7uRiVNCuD0x6Q6r1AVdodM6s754WfLjsLWhneRa2RlV1D2T_WvRVkZiOwQSNmhOYAqOGCey8MSgmExuPrjoDSFCbR1xza-p2-FnWlhge_ubywfZ4FKQBFcsFqwk2plGZ3m8KhNG54pbD73h-WrTMQQWzm-L2NqXkQpkw_ozSJsEd0SnDaEIMV9F7Kb4znNdY-Zy6RcUjWh0sATG-dxjy1EF995o",
    isFavorite: false
  },
  {
    id: "food-sushi-rice",
    name: "Sushi Rice",
    portion: "1 bowl (120g)",
    servingUnit: "bowl",
    servingSize: 1,
    calories: 160,
    protein: 3,
    carbs: 35,
    fat: 0.5,
    fiber: 1,
    category: "Lunch",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH6j3x1m0W2PBiV3Y7hZqG3uuc1PS7-BlCGWxtCr1wMm0pOCaJzVvP-kk6IpAcmrHQUngteNsKUJovVdSOFPhmqC8K9o0SGBtdncYVEtBjODfdbuhLGP-jOcvh3GcsPJnET3Qh2UjqCbeTJfIqEpz5eLZtWMZ_kCFH90TucGYTIyiEneCJitI7thJetblG0YWB-VpZMpKqUvX97XJG-V7fZOO5oXjfNUA5iPmh1zEa7HUo2F2TU8E",
    isFavorite: false
  },
  {
    id: "food-chicken-breast",
    name: "Chicken Breast",
    portion: "150g",
    servingUnit: "serving",
    servingSize: 1,
    calories: 210,
    protein: 46,
    carbs: 0,
    fat: 3.5,
    fiber: 0,
    category: "Protein",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWTl-68PS--MEk99CeTYc8RW1lPixf0Kj8g3HYVFgQ_LBDtTj0vHRZyy3cNNkwfPoODeCNI2GyiLM6Jh2WttxScZwE8UllYh7pd1ei0oWLzmP-f0ZwYaOp4RWiUc-zlwhgRh2BIudYqQlJOUV_dC9DnsmVMSW5Ioi1dHMuxFQE7pBx4drC4iZr_zSWqWrKSyZ9qWJIowJJ7uys0K1XKM3yjT2fVTS5R9GRD_nMZxxcHOrhaF71LOM",
    isFavorite: false
  }
];

