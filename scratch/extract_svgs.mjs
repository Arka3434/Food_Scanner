import fs from 'fs';
import path from 'path';

const foodLogHtml = fs.readFileSync(path.resolve('./scratch/current_stitch/food_log.html'), 'utf8');
const dashboardHtml = fs.readFileSync(path.resolve('./scratch/current_stitch/dashboard.html'), 'utf8');

function extractSvgs(html, label) {
  console.log(`\n=== SVGs in ${label} Nav ===`);
  const navMatch = html.match(/<nav[\s\S]*?<\/nav>/);
  if (!navMatch) return;
  const nav = navMatch[0];
  const svgMatches = nav.match(/<svg[\s\S]*?<\/svg>/g) || [];
  svgMatches.forEach((s, idx) => {
    console.log(`Icon ${idx + 1}:`);
    console.log(s);
  });
}

extractSvgs(dashboardHtml, 'Dashboard');
extractSvgs(foodLogHtml, 'Food Log');
