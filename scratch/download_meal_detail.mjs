import fs from 'fs';
import path from 'path';

const url = "https://lh3.googleusercontent.com/aida/AEtjO1UKTbIdkBpLF8dLS2XgpNvMm03AJFIqm5g0W7I0KIvfJ7DoRY6SJijL5NWX-f0mlpSsX5EX_-QGm3cW7c7si4Oel25Rdg94-vEd81cIf2iu9wmony43m9dszBIHoqfRr3SNhh55GrPrIJmzNL5Z148JjI_EpknUR7ZZFRAWV8Bkvujeo0lRWCw7or0KN5OxOKOWBRLE7A-W1twFnxOOfoXkBjy7jGifC_enXUNCcySF4e-1jMLReEYS";
const res = await fetch(url);
const buffer = await res.arrayBuffer();
fs.writeFileSync(path.resolve('./scratch/stitch_screenshots/meal_detail.png'), Buffer.from(buffer));
console.log('Saved meal_detail.png');
