import fs from 'fs';
import path from 'path';

const dash = fs.readFileSync(path.resolve('./scratch/current_stitch/dashboard.html'), 'utf8');
const log = fs.readFileSync(path.resolve('./scratch/current_stitch/food_log.html'), 'utf8');

console.log('--- DASHBOARD NAV ---');
const dashNav = dash.match(/<nav[\s\S]*?<\/nav>/)[0];
console.log(dashNav);

console.log('\n--- FOOD LOG NAV ---');
const logNav = log.match(/<nav[\s\S]*?<\/nav>/)[0];
console.log(logNav);
