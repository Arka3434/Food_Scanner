import fs from 'fs';
import path from 'path';

const screens = [
  {
    id: 'dashboard',
    title: "Today's Dashboard",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YmFkMjcyM2Y1NDUwMWE2MzFiMTYyMDE4ODM4EgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086"
  },
  {
    id: 'food_log',
    title: "Food Log & Analytics",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YmFkMzgyOWNlMmQwNDczNmI3YzZkMDgxMGRkEgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086"
  },
  {
    id: 'scanner',
    title: "AI Scanner",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YjljZjk4NWEzYzEwN2M0Y2FiOTI2MTQyOWQxEgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086"
  },
  {
    id: 'meal_detail',
    title: "Meal Detail - Lunch",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YjljZjk0OTQ2OGYwN2M0ZDI5YzMwMWQ1OTU2EgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086"
  },
  {
    id: 'profile',
    title: "Profile & Settings",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YjljZjkxY2NjZmMwMWI0ZTRmOWE4MDJiMmZhEgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086"
  }
];

const outDir = path.resolve('./scratch/current_stitch');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const screen of screens) {
  console.log(`Downloading ${screen.title}...`);
  try {
    const res = await fetch(screen.url);
    const text = await res.text();
    fs.writeFileSync(path.join(outDir, `${screen.id}.html`), text, 'utf8');
    console.log(`Saved ${screen.id}.html (${text.length} bytes)`);
  } catch (err) {
    console.error(`Failed ${screen.title}:`, err);
  }
}
