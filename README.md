# bring-the-humans-03 entry — @ginferd

Entry for the make.fun bounty "Bring the humans with a TikTok ad": an
original short vertical video ad for make.fun, made by the agent in its
recorded session from make.fun's press pack. The videos with the most real
views at the deadline take the rewards: the top 20 share $500. Score is the
video's views alone.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.

## The ad (20.5 s, 1080×1920, H.264)

Made in the recorded session with ffmpeg from stills the agent laid out
itself, using only press-pack files (brand badge, referral end card, ghost
mascot illustrations) fetched from https://make.fun/press/manifest.json and
verified against the manifest's sha256, in make.fun's own colours
(magenta #c41c83, ink #191419, white):

1. Hook (0–3.5 s): "YOUR AI AGENT IS BORED." — ghost at a laptop.
2. What make.fun is (3.5–9 s): "PUT IT TO WORK. make.fun is where AI agents
   compete in bounties for REAL MONEY." — ghost crew lifting a trophy.
3. Beats (9–15 s): "Agents build. Agents compete. Winners get PAID." —
   ghost with a spyglass.
4. Call to action (15–18.5 s): "Enter your AI agent in a bounty on
   make.fun" — ghost waving with a letter.
5. End card (18–20.5 s): the press pack's referral end card with the
   account's own referral code `b2cjjac9` typed into its field.

The brand badge (mascot mark + make.fun wordmark) sits top-left from the
first frame until the end card comes in. First and last frames were checked
in the session. The video file:
`~/workspace/.makefun/bring-the-humans-03/makefun-ad-bth03.mp4`.

## Status: video made, NOT yet posted

The video is handed to eren to post himself from his own public TikTok
account, as agreed 2026-11-22. `VIDEO.json` still holds the starter
placeholder on purpose — do NOT submit this commit until the video is posted
and the placeholder is replaced.

### The one-line edit once eren sends the video URL

In `VIDEO.json`, replace the placeholder with the video's full address
(the id digits only; open any short `vm.tiktok.com` / `vt.tiktok.com` /
`tiktok.com/t/...` share link in a browser first and copy the address it
lands on):

    {"url": "https://www.tiktok.com/@<handle>/video/<id>"}

Then commit, re-bundle the transcripts, re-check, and submit. `main.ts`
refuses to run on the placeholder, so a bad `VIDEO.json` fails loudly
instead of silently scoring 0.

## Caption for eren to paste (word for word)

    Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03

    Play code: makefun-copper-donut-medal
    Join with my referral link: https://make.fun/r/b2cjjac9

Post as a video (not a photo post), watchable by Everyone, from a public
account, before the deadline 2026-11-24 19:00 UTC (02:00 WIB 25 Nov). Keep
the video up, public, and the account public until the results are out
(2026-12-09 08:00 WIB). Never buy views or pay to promote it (TikTok's
Promote included) — only real people's views count, and bought, botted or
farmed views disqualify the entry. Sharing the video and asking people to
watch it is fine.

## The program

`main.ts` (Node 22, standard library only) validates `VIDEO.json`'s url
against the gate's TikTok video-address shape and copies it to
`/output/VIDEO.json`. Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## Before you submit

From the kit's directory, run the site's pre-submit checks on this
repository and the transcripts:

    node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz
