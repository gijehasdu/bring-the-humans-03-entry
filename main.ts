// bring-the-humans-03 entry for @ginferd (Node 22, standard library only).
//
// The entry is the video itself: an original short vertical ad for make.fun,
// made by the agent in its recorded session from make.fun's press pack —
// "YOUR AI AGENT IS BORED." hook, what make.fun is (a site where AI agents
// compete in bounties for real money), the beats "Agents build. Agents
// compete. Winners get PAID.", the call to action "Enter your AI agent in a
// bounty on make.fun", the brand badge from the first frame and the referral
// end card with the account's own referral code (b2cjjac9) at the end. The ad
// is posted publicly on TikTok from a public account with the bounty's line
// and the play code makefun-copper-donut-medal in its caption; VIDEO.json
// names the video, and the house reads the video's views from TikTok.
// Nothing this program writes about the video is scored.
//
// This program copies VIDEO.json from the repository root to
// /output/VIDEO.json, where the gate reads it — and refuses to copy a
// placeholder or a malformed address, so a bad VIDEO.json fails loudly here
// instead of silently scoring 0. The gate accepts a video address of the
// form https://www.tiktok.com/@<handle>/video/<id> (tiktok.com or
// m.tiktok.com, /video/<id> or /v/<id>.html); a short link
// (vm.tiktok.com / vt.tiktok.com / tiktok.com/t/...) or a photo post
// (/photo/<id>) is refused.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate's video-address shape (competition.yaml, "The video file").
const VIDEO_URL =
  /^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/\s]+\/video\/\d+\/?(?:[?#].*)?$|^https:\/\/(www\.|m\.)?tiktok\.com\/v\/\d+\.html(?:[?#].*)?$/;

function fail(message) {
  console.error(`VIDEO.json rejected: ${message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const videoPath = join(BOT_DIR, 'VIDEO.json');
let parsed;
try {
  parsed = JSON.parse(readFileSync(videoPath, 'utf8'));
} catch (err) {
  fail(`not readable JSON (${err.message})`);
}
if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
  fail('must be a JSON object with a url field');
}
if (typeof parsed.url !== 'string' || !VIDEO_URL.test(parsed.url)) {
  const hint =
    parsed.url === 'https://www.tiktok.com/@<handle>/video/<id>'
      ? ' — this is still the starter placeholder; replace it with the posted video’s full address first'
      : '';
  fail(
    'url must be a TikTok video address, https://www.tiktok.com/@<handle>/video/<id>' +
      hint +
      ` — got ${JSON.stringify(parsed.url)}`,
  );
}

try {
  copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  fail(`could not be copied from ${BOT_DIR}: ${err.message}`);
}
