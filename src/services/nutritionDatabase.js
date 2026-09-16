// Curated dataset of sample meals with rich nutrition details, bounding boxes, and image assets

export const SAMPLE_MEALS = [
  {
    id: "sample-chicken-bowl",
    name: "Grilled Chicken & Quinoa Bowl",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    healthScore: "A",
    healthScoreNum: 92,
    calories: 660,
    protein: 48,
    carbs: 62,
    fat: 18,
    fiber: 11,
    sugar: 4,
    sodium: 480,
    glycemicIndex: "Low (38)",
    allergens: [],
    highlights: ["High Protein", "Rich in Fiber", "Zero Added Sugar"],
    boundingBoxes: [
      { label: "Herb Grilled Chicken", confidence: 96, weight: "180g", kcal: 310, top: "25%", left: "20%", width: "42%", height: "35%" },
      { label: "Steamed Quinoa", confidence: 91, weight: "160g", kcal: 210, top: "45%", left: "55%", width: "38%", height: "32%" },
      { label: "Roasted Greens & Veg", confidence: 88, weight: "120g", kcal: 140, top: "18%", left: "52%", width: "32%", height: "26%" }
    ],
    items: [
      { name: "Herb Grilled Chicken Breast", portion: "180g", calories: 310, protein: 40, carbs: 0, fat: 6 },
      { name: "Organic Tri-Color Quinoa", portion: "160g", calories: 210, protein: 6, carbs: 42, fat: 3 },
      { name: "Roasted Broccoli & Avocado Dressing", portion: "120g", calories: 140, protein: 2, carbs: 20, fat: 9 }
    ]
  },
  {
    id: "sample-avocado-toast",
    name: "Sourdough Avocado & Poached Egg",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    healthScore: "A",
    healthScoreNum: 89,
    calories: 440,
    protein: 18,
    carbs: 38,
    fat: 24,
    fiber: 9,
    sugar: 3,
    sodium: 420,
    glycemicIndex: "Low (42)",
    allergens: ["Gluten", "Eggs"],
    highlights: ["Healthy Fats (Omega-3)", "High Fiber", "Gut-Friendly Sourdough"],
    boundingBoxes: [
      { label: "Poached Free-Range Eggs", confidence: 94, weight: "100g", kcal: 150, top: "22%", left: "32%", width: "36%", height: "30%" },
      { label: "Smashed Hass Avocado", confidence: 97, weight: "90g", kcal: 160, top: "42%", left: "22%", width: "55%", height: "35%" },
      { label: "Artisan Sourdough Slice", confidence: 92, weight: "75g", kcal: 130, top: "50%", left: "15%", width: "70%", height: "35%" }
    ],
    items: [
      { name: "Artisan Sourdough Bread", portion: "1 slice (75g)", calories: 130, protein: 5, carbs: 26, fat: 1 },
      { name: "Smashed Hass Avocado with Lemon", portion: "90g", calories: 160, protein: 2, carbs: 8, fat: 15 },
      { name: "Poached Free-Range Eggs (2x)", portion: "100g", calories: 150, protein: 11, carbs: 1, fat: 8 }
    ]
  },
  {
    id: "sample-salmon-salad",
    name: "Wild Alaskan Salmon Poke Salad",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    healthScore: "A",
    healthScoreNum: 95,
    calories: 520,
    protein: 42,
    carbs: 24,
    fat: 26,
    fiber: 8,
    sugar: 5,
    sodium: 520,
    glycemicIndex: "Very Low (28)",
    allergens: ["Fish", "Sesame"],
    highlights: ["Rich in EPA/DHA", "Antioxidant Packed", "Anti-inflammatory"],
    boundingBoxes: [
      { label: "Wild Salmon Fillet", confidence: 98, weight: "170g", kcal: 320, top: "26%", left: "28%", width: "46%", height: "34%" },
      { label: "Edamame & Mixed Greens", confidence: 90, weight: "140g", kcal: 110, top: "48%", left: "18%", width: "40%", height: "32%" },
      { label: "Sesame Avocado Dressing", confidence: 85, weight: "35g", kcal: 90, top: "35%", left: "62%", width: "28%", height: "28%" }
    ],
    items: [
      { name: "Wild Alaskan Salmon Fillet", portion: "170g", calories: 320, protein: 36, carbs: 0, fat: 18 },
      { name: "Mixed Organic Baby Greens", portion: "100g", calories: 25, protein: 2, carbs: 4, fat: 0 },
      { name: "Steamed Edamame Beans", portion: "70g", calories: 85, protein: 8, carbs: 7, fat: 3 },
      { name: "Toasted Sesame Citrus Dressing", portion: "30g", calories: 90, protein: 1, carbs: 3, fat: 8 }
    ]
  },
  {
    id: "sample-cheeseburger",
    name: "Classic Smash Cheeseburger & Fries",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    healthScore: "D",
    healthScoreNum: 48,
    calories: 980,
    protein: 36,
    carbs: 88,
    fat: 52,
    fiber: 4,
    sugar: 12,
    sodium: 1380,
    glycemicIndex: "High (74)",
    allergens: ["Dairy", "Gluten", "Sesame"],
    highlights: ["High Calorie Density", "High Sodium Alert", "Elevated Saturated Fats"],
    boundingBoxes: [
      { label: "Beef Burger with Cheddar", confidence: 96, weight: "240g", kcal: 620, top: "20%", left: "18%", width: "52%", height: "48%" },
      { label: "Crispy French Fries", confidence: 93, weight: "150g", kcal: 360, top: "35%", left: "55%", width: "40%", height: "45%" }
    ],
    items: [
      { name: "Double Angus Beef Patty & Cheese", portion: "240g", calories: 620, protein: 32, carbs: 38, fat: 38 },
      { name: "Salted Crispy French Fries", portion: "150g", calories: 360, protein: 4, carbs: 50, fat: 14 }
    ]
  },
  {
    id: "sample-acai-bowl",
    name: "Organic Superfood Acai Bowl",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80",
    healthScore: "B",
    healthScoreNum: 82,
    calories: 380,
    protein: 10,
    carbs: 64,
    fat: 9,
    fiber: 12,
    sugar: 28,
    sodium: 85,
    glycemicIndex: "Medium (52)",
    allergens: ["Tree Nuts"],
    highlights: ["Antioxidant Powerhouse", "Vitamin C Rich", "No Artificial Sweeteners"],
    boundingBoxes: [
      { label: "Acai Puree Base", confidence: 95, weight: "220g", kcal: 180, top: "35%", left: "20%", width: "60%", height: "45%" },
      { label: "Fresh Berries & Chia", confidence: 92, weight: "80g", kcal: 70, top: "20%", left: "25%", width: "45%", height: "30%" },
      { label: "Coconut Almond Granola", confidence: 89, weight: "40g", kcal: 130, top: "25%", left: "55%", width: "35%", height: "35%" }
    ],
    items: [
      { name: "Organic Pure Acai Puree", portion: "220g", calories: 180, protein: 3, carbs: 32, fat: 5 },
      { name: "Fresh Strawberries & Blueberries", portion: "80g", calories: 70, protein: 1, carbs: 16, fat: 0 },
      { name: "Almond Flaxseed Granola", portion: "40g", calories: 130, protein: 4, carbs: 16, fat: 4 }
    ]
  }
];

// Searchable food database for manual log & search
export const FOOD_DATABASE = [
  { id: "f-1", name: "Boiled Eggs (2 large)", portion: "100g", calories: 143, protein: 12.6, carbs: 0.8, fat: 9.5, category: "breakfast", healthScore: "A" },
  { id: "f-2", name: "Oatmeal with Almond Milk", portion: "250g", calories: 210, protein: 7, carbs: 34, fat: 5, category: "breakfast", healthScore: "A" },
  { id: "f-3", name: "Greek Yogurt (0% Fat)", portion: "200g", calories: 120, protein: 20, carbs: 6, fat: 0, category: "snack", healthScore: "A" },
  { id: "f-4", name: "Whey Protein Shake (1 scoop)", portion: "30g", calories: 125, protein: 25, carbs: 2, fat: 1.5, category: "snack", healthScore: "A" },
  { id: "f-5", name: "Brown Basmati Rice", portion: "150g cooked", calories: 170, protein: 3.5, carbs: 36, fat: 1.2, category: "lunch", healthScore: "A" },
  { id: "f-6", name: "Grilled Chicken Breast", portion: "150g", calories: 248, protein: 46, carbs: 0, fat: 5.4, category: "lunch", healthScore: "A" },
  { id: "f-7", name: "Steamed Broccoli Florets", portion: "120g", calories: 42, protein: 3.4, carbs: 8, fat: 0.5, category: "dinner", healthScore: "A" },
  { id: "f-8", name: "Extra Virgin Olive Oil (1 tbsp)", portion: "14ml", calories: 119, protein: 0, carbs: 0, fat: 13.5, category: "condiment", healthScore: "B" },
  { id: "f-9", name: "Whole Grain Toast", portion: "1 slice (40g)", calories: 95, protein: 4, carbs: 17, fat: 1.1, category: "breakfast", healthScore: "A" },
  { id: "f-10", name: "Peanut Butter (Natural)", portion: "32g (2 tbsp)", calories: 190, protein: 8, carbs: 6, fat: 16, category: "snack", healthScore: "B" },
  { id: "f-11", name: "Banana (Medium)", portion: "118g", calories: 105, protein: 1.3, carbs: 27, fat: 0.3, category: "snack", healthScore: "A" },
  { id: "f-12", name: "Grilled Paneer Tikka", portion: "150g", calories: 340, protein: 22, carbs: 8, fat: 24, category: "dinner", healthScore: "B" },
  { id: "f-13", name: "Black Coffee (Americano)", portion: "240ml", calories: 4, protein: 0.3, carbs: 0, fat: 0, category: "drink", healthScore: "A" },
  { id: "f-14", name: "Matcha Green Tea Latte", portion: "300ml", calories: 140, protein: 6, carbs: 18, fat: 4.5, category: "drink", healthScore: "B" },
  { id: "f-15", name: "Almonds (Raw)", portion: "28g (23 nuts)", calories: 164, protein: 6, carbs: 6, fat: 14, category: "snack", healthScore: "A" }
];
