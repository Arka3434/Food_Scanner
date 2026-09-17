import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve('./scratch/current_stitch/scanner.html'), 'utf8');
const bodyIdx = html.indexOf('<body');
console.log(html.slice(html.length - 2500));
