import fs from 'fs';
import path from 'path';

const files = ['dashboard.html', 'food_log.html', 'scanner.html', 'meal_detail.html', 'profile.html'];

for (const file of files) {
  const filePath = path.resolve('./scratch/current_stitch', file);
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=================== ${file} ===================`);
  
  // Look for nav or bottom navigation classes
  const navMatches = html.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  if (navMatches.length > 0) {
    for (const nav of navMatches) {
      console.log('--- FOUND <nav> ---');
      console.log(nav);
    }
  } else {
    // Look for fixed bottom bar
    const bottomMatches = html.match(/<div[^>]*fixed[^>]*bottom[\s\S]*?<\/div>\s*<\/div>/gi) || [];
    console.log('--- Matches for fixed bottom ---', bottomMatches.length);
    for (const bm of bottomMatches) {
      console.log(bm.slice(0, 500));
    }
  }
}
