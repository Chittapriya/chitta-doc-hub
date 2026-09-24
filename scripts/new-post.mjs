// Usage: npm run new-post -- <slug> "<Title>"
import fs from 'node:fs';
import path from 'node:path';

const [slug, title] = process.argv.slice(2);

if (!slug || !title || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run new-post -- <kebab-case-slug> "<Title>"');
  process.exit(1);
}

const dir = path.join('src', 'content', 'blog', slug);
if (fs.existsSync(dir)) {
  console.error(`Post already exists: ${dir}`);
  process.exit(1);
}

const xml = (s) => s.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);
const today = new Date().toISOString().slice(0, 10);

fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });

fs.writeFileSync(
  path.join(dir, 'assets', 'cover.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" font-family="Segoe UI, Roboto, Arial, sans-serif">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#075985"/><stop offset="1" stop-color="#0E7490"/></linearGradient></defs>
  <rect width="800" height="420" fill="url(#bg)"/>
  <text x="60" y="200" fill="#FFFFFF" font-size="44" font-weight="700">${xml(title)}</text>
  <text x="60" y="250" fill="#BAE6FD" font-size="20">CHITTA Labs</text>
</svg>
`,
);

fs.writeFileSync(
  path.join(dir, 'index.md'),
  `---
title: ${JSON.stringify(title)}
date: ${today}
description: "One or two sentences shown on the post card and in search results."
cover: ./assets/cover.svg
tags:
  - AI
draft: true
---

## Introduction

Write your post here. Put images in \`./assets/\` and reference them as \`![Alt text](./assets/image.png)\`.
`,
);

console.log(`Created ${dir}/index.md (draft: true — set to false to publish)`);
