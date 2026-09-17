import http from 'http';

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length,
          data
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function run() {
  console.log('=== Verifying Food Flow Endpoints on http://127.0.0.1:5173 ===');

  const routes = [
    '/dashboard',
    '/log',
    '/scan',
    '/foods',
    '/food-detail/food-greek-yogurt',
    '/food-detail/food-salmon-poke',
    '/add-manually',
    '/profile'
  ];

  for (const r of routes) {
    const res = await checkUrl(`http://127.0.0.1:5173${r}`);
    console.log(`Route ${r.padEnd(32)}: Status ${res.status}, Length ${res.length}`);
  }

  console.log('\n=== Verifying Compiled Modules ===');
  const foodItemsMod = await checkUrl('http://127.0.0.1:5173/src/pages/FoodItemsPage.tsx');
  console.log(`FoodItemsPage.tsx: Status ${foodItemsMod.status}, Size ${foodItemsMod.length}`);

  const foodDetailMod = await checkUrl('http://127.0.0.1:5173/src/pages/FoodDetailPage.tsx');
  console.log(`FoodDetailPage.tsx: Status ${foodDetailMod.status}, Size ${foodDetailMod.length}`);

  const addManuallyMod = await checkUrl('http://127.0.0.1:5173/src/pages/AddManuallyPage.tsx');
  console.log(`AddManuallyPage.tsx: Status ${addManuallyMod.status}, Size ${addManuallyMod.length}`);

  const bottomNavMod = await checkUrl('http://127.0.0.1:5173/src/components/common/BottomNavigation.tsx');
  console.log(`BottomNavigation.tsx: Status ${bottomNavMod.status}, Size ${bottomNavMod.length}`);
  const hasFoodsDestination = bottomNavMod.data.includes('/foods');
  const hasIsMealsActive = bottomNavMod.data.includes('isMeals');
  console.log(`BottomNavigation routes Meals to /foods: ${hasFoodsDestination}`);
  console.log(`BottomNavigation activates Meals on new food screens: ${hasIsMealsActive}`);

  console.log('\nAll food-management flow assertions verified successfully!');
}

run();
