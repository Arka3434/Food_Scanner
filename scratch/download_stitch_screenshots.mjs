import fs from 'fs';
import path from 'path';

const screenshots = [
  {
    name: 'dashboard.png',
    url: "https://lh3.googleusercontent.com/aida/AEtjO1WchD9olEmt1dtiBcD9BopFA0fItw4z9ZQYa83sAGXUepXJkkAQPLDQ9IDE_9NzXdgmTUmRraL7dU-E2rqILT5kl5JtNjYBJ3ixuRpweRARb0mcBgon_m23oGYS553GkWFDkC5HgNiNHiIDsN22MZi0xBTelg3KkyufsYJdBh2GSYcrOuvgY40QgwzfQExwWAFlANsiRBySUZSsH-d2dDEg8D85tOW5b6LLVlMX4ZEaPXUKMpdHpjQRnA"
  },
  {
    name: 'food_log.png',
    url: "https://lh3.googleusercontent.com/aida/AEtjO1U7juPr1mezdzJmPieovNsy53eLsoVU-DFFFOqhW5l8aMIVOzFnbxjHpq3gDOiX0QGMQfOIho6up0Uft3fGj9kElpVhDPEAP1c3Dm6hwV3qwur1aqheFy-VkEZnELxtlmcaV9m-OE4sBSWIhv65YqAFmtMoK_Fwl8ahZ0F1EGolNIDTFGhICYmL50M44eS7Ltejk5TZSga1tCYUTk5g3o_bx1_0dKzKRSyRyfoT0VO6Ad1nLaq4Flxd"
  },
  {
    name: 'scanner.png',
    url: "https://lh3.googleusercontent.com/aida/AEtjO1Vcx8HlXFZ5O24ndpPck8vOq8RHUfsbghfYy9qnLNsQtJO9nB-2PvCKW6EOcPAi6EaRtegr7ksac17JrCgsqgKUE2sw6JubKxzVAgaiqKjFBfuQyCAG3_mLRgf8G8ms6DbdVtfjUBMjB09aHGxfKA5wq1qMw0tBIAFwgAmzsYUZCvJmmsrzGviOJn8K-QOgRxOXQCRZ3MvFn44dy03bE3WEgabqSq0-2Wm3Gp3_9hvS_XOQuBlKoH4zMw"
  },
  {
    name: 'profile.png',
    url: "https://lh3.googleusercontent.com/aida/AEtjO1XEjDUV6V2mlIxGToOOpHia7UtlDZCSt2izSAG2V2NFoNRrikVyXDMUc1BqwS8G5s06jHyIQGCvFCpRqKVFPU2Iwri50jF2natIxsjqPRoF4IbzZ8EHTnLbWC7o2Pi1MKCOLYctbow39GRzKK_e2WVjcgqghQPiFqsoPosuhT0xXjS7e56pZXlATNtnse4F5G_y1YxZEkmQ1n2GmSEzil9kGMz6chOpQxvg7bTcd5Q-Fnh-nAx0nWji"
  }
];

const dir = path.resolve('./scratch/stitch_screenshots');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

for (const s of screenshots) {
  const res = await fetch(s.url);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(path.join(dir, s.name), Buffer.from(buffer));
  console.log(`Saved ${s.name}`);
}
