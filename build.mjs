import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = import.meta.dirname;
const partialPath = join(root, 'partials', 'head-analytics.html');
const partial = readFileSync(partialPath, 'utf8');

const analyticsPattern =
  /  <script src="(?:\.\.\/)?js\/analytics\.js"><\/script>\s*\n|  <script>\s*\(function \(\) \{[\s\S]*?js\/analytics\.js[\s\S]*?<\/script>\s*\n/;

const insertAfter =
  /<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">\n/;

function collectHtmlFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      files.push(...collectHtmlFiles(path));
      continue;
    }

    if (entry.endsWith('.html')) {
      files.push(path);
    }
  }

  return files;
}

let updated = 0;

for (const file of collectHtmlFiles(root)) {
  if (relative(root, file).startsWith('partials')) {
    continue;
  }

  let html = readFileSync(file, 'utf8');
  let next = html;

  if (analyticsPattern.test(html)) {
    next = html.replace(analyticsPattern, partial);
  } else if (insertAfter.test(html)) {
    next = html.replace(insertAfter, `$&${partial}`);
  }

  if (next !== html) {
    writeFileSync(file, next);
    updated += 1;
    console.log(`updated ${relative(root, file)}`);
  }
}

console.log(updated ? `Done. Updated ${updated} file(s).` : 'No HTML files needed changes.');
