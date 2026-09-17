import fs from 'fs';
import path from 'path';

for (const file of ['dashboard.html', 'meal_detail.html']) {
  const filePath = path.resolve('./scratch/current_stitch', file);
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=================== ${file} ===================`);
  const navMatches = html.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  console.log(`nav count: ${navMatches.length}`);
  for (const nav of navMatches) {
    console.log(nav);
  }
}
