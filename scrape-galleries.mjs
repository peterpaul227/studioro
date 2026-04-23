// Scrape per-project content from studioro.com (Cargo Collective) using Playwright.
// Output: src/lib/scraped-galleries.json
// Run with: node scrape-galleries.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.join(
  __dirname,
  "src",
  "lib",
  "scraped-galleries.json",
);

const HOME_URL = "https://studioro.com/";

// The 41 slugs from src/lib/data.ts
const SLUGS = [
  "delft-reflexionz",
  "whisky-center-interwhisky-2022",
  "buro-delftse-zaken",
  "met-vlag-en-wimpel",
  "norwegian-gem",
  "epica-storm-the-sorrow",
  "ihc-merwede-keel-laying",
  "heijmans-bodemsanering",
  "strukton-werkplaats-toekomst",
  "strukton-immersion-projects",
  "orbitvu-benelux",
  "benelux-hondekop-220902",
  "springbank-proeverij-delft",
  "whisky-center-dingle-delft",
  "flower-factor-floraholland",
  "van-merksteijn-staaldraad",
  "cablehouse-bluesband",
  "hofland-flowering-plants",
  "joulz-dedemsvaart",
  "henk-fransen-zoektocht",
  "knmi-cabauw-drone",
  "gene-jewels-dna",
  "bling-de-film",
  "dj-roy-gates-midnight-sun",
  "ellen-macarthur-desso",
  "prins-filip-desso-dendermonde",
  "philips-ambilight-animatie",
  "smit-visual-focus-board",
  "zakelijke-trainer",
  "bord-voor-delft-making-of",
  "bts-fashion-shoot-ileenja",
  "auxilium-portret",
  "delfts-blauwe-panden",
  "captured-light",
  "mark-van-huystee-stadsgezichten",
  "mark-van-huystee-vier-vs",
  "massxess",
  "de-koning-staalwerken",
  "pvr-machining",
  "trouwen-zoals-jullie-willen",
];

// Normalise a string for fuzzy matching: lowercase, remove non-alphanumerics.
function norm(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

// Score how well a Cargo href matches a slug.
function score(slug, href) {
  const a = norm(slug);
  const b = norm(href);
  if (!a || !b) return 0;
  if (b.includes(a)) return a.length + 5; // direct containment
  // Longest common substring by word overlap
  const slugWords = slug.split("-").filter((w) => w.length > 2);
  let hits = 0;
  for (const w of slugWords) {
    if (b.includes(w)) hits += w.length;
  }
  return hits;
}

async function collectHomepageLinks(page) {
  await page.goto(HOME_URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  const hrefs = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a[href]"));
    const urls = new Set();
    for (const a of anchors) {
      const h = a.getAttribute("href") || "";
      // Keep internal Cargo project links like "/Project-Name"
      if (/^\/[A-Za-z]/.test(h) && !h.startsWith("/index")) {
        urls.add(h);
      }
    }
    return Array.from(urls);
  });
  return hrefs;
}

function buildSlugToUrlMap(slugs, homepageHrefs) {
  const map = {};
  for (const slug of slugs) {
    let best = null;
    let bestScore = 0;
    for (const href of homepageHrefs) {
      const s = score(slug, href);
      if (s > bestScore) {
        bestScore = s;
        best = href;
      }
    }
    if (best) map[slug] = best;
  }
  return map;
}

async function scrapeProject(page, url) {
  const full = url.startsWith("http") ? url : `https://studioro.com${url}`;
  try {
    await page.goto(full, { waitUntil: "networkidle", timeout: 45000 });
  } catch (err) {
    // Try again with a lighter wait condition
    try {
      await page.goto(full, { waitUntil: "domcontentloaded", timeout: 45000 });
    } catch (err2) {
      return { error: String(err2), gallery: [], videos: [], extraText: "" };
    }
  }
  await page.waitForTimeout(2500);

  // Scroll to force lazy loads
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total > document.body.scrollHeight + 2000) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const out = {
      gallery: [],
      videos: [],
      extraText: "",
    };
    const addImg = (src) => {
      if (!src) return;
      if (!src.includes("payload.cargocollective.com")) return;
      if (src.includes("prt_200x") || src.includes("prt_200")) return;
      out.gallery.push(src);
    };

    // <img> tags with src or data-src
    for (const img of document.querySelectorAll("img")) {
      addImg(img.getAttribute("src"));
      addImg(img.getAttribute("data-src"));
      addImg(img.getAttribute("data-original"));
    }
    // elements with data-src / data-href / inline background-image
    for (const el of document.querySelectorAll("[data-src],[data-href]")) {
      addImg(el.getAttribute("data-src"));
      addImg(el.getAttribute("data-href"));
    }
    for (const el of document.querySelectorAll("[style]")) {
      const style = el.getAttribute("style") || "";
      const m = style.match(/url\(["']?([^"')]+)["']?\)/);
      if (m) addImg(m[1]);
    }

    // Iframes: vimeo / youtube
    const seen = new Set();
    for (const iframe of document.querySelectorAll("iframe")) {
      const src = iframe.getAttribute("src") || iframe.getAttribute("data-src") || "";
      if (!src) continue;
      let m;
      if ((m = src.match(/player\.vimeo\.com\/video\/(\d+)/))) {
        const k = `vimeo:${m[1]}`;
        if (!seen.has(k)) { seen.add(k); out.videos.push({ provider: "vimeo", id: m[1] }); }
      } else if ((m = src.match(/vimeo\.com\/(\d+)/))) {
        const k = `vimeo:${m[1]}`;
        if (!seen.has(k)) { seen.add(k); out.videos.push({ provider: "vimeo", id: m[1] }); }
      } else if ((m = src.match(/youtube\.com\/embed\/([A-Za-z0-9_-]+)/))) {
        const k = `youtube:${m[1]}`;
        if (!seen.has(k)) { seen.add(k); out.videos.push({ provider: "youtube", id: m[1] }); }
      } else if ((m = src.match(/youtu\.be\/([A-Za-z0-9_-]+)/))) {
        const k = `youtube:${m[1]}`;
        if (!seen.has(k)) { seen.add(k); out.videos.push({ provider: "youtube", id: m[1] }); }
      }
    }

    // Any element with data-vimeo-id
    for (const el of document.querySelectorAll("[data-vimeo-id]")) {
      const id = el.getAttribute("data-vimeo-id");
      if (id) {
        const k = `vimeo:${id}`;
        if (!seen.has(k)) { seen.add(k); out.videos.push({ provider: "vimeo", id }); }
      }
    }

    // Scan raw HTML for inline vimeo/youtube IDs (Cargo sometimes lazy-loads)
    const html = document.documentElement.outerHTML;
    const vimeoMatches = html.matchAll(/(?:player\.vimeo\.com\/video\/|vimeo\.com\/)(\d{5,})/g);
    for (const m of vimeoMatches) {
      const k = `vimeo:${m[1]}`;
      if (!seen.has(k)) { seen.add(k); out.videos.push({ provider: "vimeo", id: m[1] }); }
    }
    const ytMatches = html.matchAll(/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/g);
    for (const m of ytMatches) {
      const k = `youtube:${m[1]}`;
      if (!seen.has(k)) { seen.add(k); out.videos.push({ provider: "youtube", id: m[1] }); }
    }

    // Extract visible text paragraphs (Cargo uses .cargo-contents or generic divs)
    const textNodes = [];
    const blocks = document.querySelectorAll("p, div.text, .text, .cargo-text, [class*='text']");
    const seenText = new Set();
    for (const el of blocks) {
      const t = (el.innerText || "").trim();
      if (t.length < 30) continue;
      if (seenText.has(t)) continue;
      seenText.add(t);
      textNodes.push(t);
    }
    out.extraText = textNodes.join("\n\n");
    // De-dupe gallery preserving order
    out.gallery = Array.from(new Set(out.gallery));
    return out;
  });

  return data;
}

async function main() {
  // Load existing output (resume support)
  let out = {};
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      out = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"));
    } catch {}
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log("Fetching homepage to collect project links...");
  const hrefs = await collectHomepageLinks(page);
  console.log(`Found ${hrefs.length} internal links on homepage.`);

  const mapping = buildSlugToUrlMap(SLUGS, hrefs);
  // Hard-coded overrides for tricky slugs (from user's prompt)
  const overrides = {
    "delft-reflexionz": "/Delft-RefleXionZ",
    "whisky-center-interwhisky-2022":
      "/Whisky-Center-Internationaal-Whisky-Festival-Den-Haag-2022",
    "buro-delftse-zaken": "/Buro-Delftse-Zaken",
    "met-vlag-en-wimpel": "/Met-Vlag-Wimpel",
    "norwegian-gem": "/Norwegian-Gem",
  };
  for (const [k, v] of Object.entries(overrides)) {
    mapping[k] = v;
  }

  console.log("Slug -> Cargo URL mapping:");
  for (const slug of SLUGS) {
    console.log(`  ${slug} -> ${mapping[slug] || "(not found)"}`);
  }

  for (const slug of SLUGS) {
    const url = mapping[slug];
    if (!url) {
      console.log(`[skip] ${slug}: no URL mapped`);
      out[slug] = out[slug] || { videos: [], gallery: [], extraText: "" };
      continue;
    }
    console.log(`\nScraping ${slug} (${url}) ...`);
    try {
      const data = await scrapeProject(page, url);
      out[slug] = {
        videos: data.videos,
        gallery: data.gallery,
        extraText: data.extraText,
        sourceUrl: `https://studioro.com${url}`,
      };
      console.log(
        `  -> ${data.gallery.length} images, ${data.videos.length} videos, ${
          data.extraText ? data.extraText.length : 0
        } chars of text`,
      );
    } catch (err) {
      console.error(`  !! error for ${slug}:`, err.message);
      out[slug] = out[slug] || {
        videos: [],
        gallery: [],
        extraText: "",
        error: err.message,
      };
    }
    // Save incrementally
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(out, null, 2));
  }

  await browser.close();
  console.log(`\nDone. Wrote ${OUTPUT_PATH}`);

  // Summary
  const empty = [];
  const withVideo = [];
  const withImages = [];
  for (const slug of SLUGS) {
    const v = out[slug] || {};
    if ((v.videos || []).length > 0) withVideo.push(slug);
    if ((v.gallery || []).length > 0) withImages.push(slug);
    if (!(v.videos || []).length && !(v.gallery || []).length) empty.push(slug);
  }
  console.log(`\nSummary:`);
  console.log(`  with video: ${withVideo.length}`);
  console.log(`  with >=1 image: ${withImages.length}`);
  console.log(`  empty: ${empty.length} (${empty.join(", ")})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
