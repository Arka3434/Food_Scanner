import fs from 'fs';
import path from 'path';

const newScreens = [
  {
    id: 'food_items',
    title: 'Food Items',
    htmlUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YmFlYzQxMjM4MzAwMWVlNGVhNDI5MDg2OTllEgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UkaQ3YB5Zkoz57RfIH6Pz-BQ-Q6f-6hoD2UV_7qGpYiy21bx8prdw8MGwjZq8CpLbP0ThsfXi1AOiZ4H29j0wVIuOQmDgO8txuMBNh2e_7wJ8uzm688CFMb2MLhKNwk4kOdgtQlxkTZYKsWKLAWmer4uwmrVGYQI6KcE-v3IWKxgVH6abGbVRyeS4CQA6yjnrkLPhvHPnglE_3NmEaGM1sn-Q4oJqxLOPM4IXpJq5VU5c1YyCxsLLyhQ'
  },
  {
    id: 'food_detail',
    title: 'Food Detail',
    htmlUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YmFlYzQ2ZDM0NDgwMDMwMGZjNjIzMjVjMjAzEgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WinTHbhIrJ1vC3QQqCkGbNUstZ_7Xi7Njo3FFcfHqAo8WarhZON9ar_GUypgrLizp14sVGNvtQ1W_PXdTOQZqEoW1MgBGKqYHocfJifYOE11zoQJa-ufcvvFGahgO2X8H2yFTjfNsQI7ul-XvACUPNBV90yj68rrfwdD2s78CV4NmdifoX3ia0IYX-EEw4bySlyLyt6-KIT4ry5wp72AvKWtm8C7Z4DEBgHUW-qAnl5d1ZYz7ORFdcIA'
  },
  {
    id: 'add_manually',
    title: 'Add Manually',
    htmlUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzAwMDY1YmFlYzQzMTBiZDcwNDczNmRlZjUwMzg0ZjIyEgsSBxDGgJ39xRIYAZIBIgoKcHJvamVjdF9pZBIUQhI5NzM0NzIxODAwNDg3MDQxNTk&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VnJqhbAWIH46fuVDGQH_HupIUJfZTE_bOprwwilG1m89TluaFGikecNmVCa3VCEjGas8qSu7fGoChJKuitYMJfVRfm6aDvutUEOIDluPUEcXwWxwK9o6qY8iEv_PJnUpgYt5rU7ZMnMj3LRLOAMIrDaKUO0Wn7cSXsgt_CkjQJCn6ICLA7_YuC70wqQZqpSm-AU6RjC3ILcRGQ6-XNndkT2Dy8HLh9GCVK4dUYgS_yk93mhIxpUV59JA'
  }
];

const outHtmlDir = path.resolve('./scratch/current_stitch');
const outImgDir = path.resolve('./scratch/stitch_screenshots');

for (const s of newScreens) {
  console.log(`Fetching ${s.title}...`);
  const htmlRes = await fetch(s.htmlUrl);
  const htmlText = await htmlRes.text();
  fs.writeFileSync(path.join(outHtmlDir, `${s.id}.html`), htmlText, 'utf8');
  console.log(`Saved ${s.id}.html (${htmlText.length} bytes)`);

  const imgRes = await fetch(s.imgUrl);
  const imgBuf = await imgRes.arrayBuffer();
  fs.writeFileSync(path.join(outImgDir, `${s.id}.png`), Buffer.from(imgBuf));
  console.log(`Saved ${s.id}.png`);
}
