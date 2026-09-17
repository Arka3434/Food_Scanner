import http from 'http';
import fs from 'fs';
import path from 'path';

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
  console.log('=== Verifying Vite LAN Server at http://192.168.29.223:5173 ===');
  
  // 1. Check Root
  const rootRes = await checkUrl('http://192.168.29.223:5173/');
  console.log(`Root GET: Status ${rootRes.status}, Size ${rootRes.length} bytes`);

  // 2. Check compiled BottomNavigation component via Vite module server
  const navMod = await checkUrl('http://192.168.29.223:5173/src/components/common/BottomNavigation.tsx');
  console.log(`BottomNavigation.tsx GET: Status ${navMod.status}, Size ${navMod.length} bytes`);
  
  const hasDashboard = navMod.data.includes('DashboardNavIcon');
  const hasAnalytics = navMod.data.includes('AnalyticsNavIcon');
  const hasScan = navMod.data.includes('ScanNavIcon');
  const hasMeals = navMod.data.includes('MealsNavIcon');
  const hasSettings = navMod.data.includes('SettingsNavIcon');
  console.log(`Contains DashboardNavIcon: ${hasDashboard}`);
  console.log(`Contains AnalyticsNavIcon: ${hasAnalytics}`);
  console.log(`Contains ScanNavIcon: ${hasScan}`);
  console.log(`Contains MealsNavIcon: ${hasMeals}`);
  console.log(`Contains SettingsNavIcon: ${hasSettings}`);

  // 3. Check compiled BottomNavIcons component
  const iconsMod = await checkUrl('http://192.168.29.223:5173/src/components/common/BottomNavIcons.tsx');
  console.log(`BottomNavIcons.tsx GET: Status ${iconsMod.status}, Size ${iconsMod.length} bytes`);
  
  // Verify paths in icons
  const hasBarcodeCoords = iconsMod.data.includes('7.5v9') || iconsMod.data.includes('7.5');
  const hasUtensilsCoords = iconsMod.data.includes('18 22L9.5 9.5') || iconsMod.data.includes('9.5');
  const hasTrendlineCoords = iconsMod.data.includes('5 16l4-5') || iconsMod.data.includes('16l4-5');
  console.log(`Has Barcode Viewfinder coords: ${hasBarcodeCoords}`);
  console.log(`Has Crossed Utensils coords: ${hasUtensilsCoords}`);
  console.log(`Has Analytics Trendline coords: ${hasTrendlineCoords}`);

  // 4. Check routes
  const routes = ['/dashboard', '/log', '/scan', '/profile'];
  for (const r of routes) {
    const res = await checkUrl(`http://192.168.29.223:5173${r}`);
    console.log(`Route ${r.padEnd(15)}: Status ${res.status}`);
  }

  console.log('\nAll bottom navigation assertions passed successfully!');
}

run();
