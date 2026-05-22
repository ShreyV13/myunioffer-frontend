import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, 'prerendered');
const distDir = join(__dirname, 'dist');

if (!existsSync(srcDir)) {
  console.log('No prerendered/ folder found, skipping.');
  process.exit(0);
}

function copyHtml(dir, rel) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const relPath = rel ? `${rel}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      copyHtml(full, relPath);
    } else if (entry === 'index.html') {
      const dest = join(distDir, rel || '');
      mkdirSync(dest, { recursive: true });
      writeFileSync(join(dest, 'index.html'), readFileSync(full));
      console.log(`  Copied ${relPath}`);
    }
  }
}

console.log('Copying pre-rendered HTML to dist...');
copyHtml(srcDir, '');
console.log('Done.');
