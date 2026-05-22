import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');
const outDir = join(__dirname, 'prerendered');

function copyHtml(dir, rel) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const relPath = rel ? `${rel}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      copyHtml(full, relPath);
    } else if (entry === 'index.html') {
      const dest = join(outDir, rel || '');
      mkdirSync(dest, { recursive: true });
      writeFileSync(join(dest, 'index.html'), readFileSync(full));
      console.log(`  Saved prerendered/${rel || '.'}/index.html`);
    }
  }
}

console.log('Saving pre-rendered HTML...');
mkdirSync(outDir, { recursive: true });

// Copy root index.html
writeFileSync(join(outDir, 'index.html'), readFileSync(join(distDir, 'index.html')));
console.log('  Saved prerendered/index.html');

// Copy all subdirectory index.html files
const subdirs = readdirSync(distDir).filter(f => statSync(join(distDir, f)).isDirectory());
for (const sub of subdirs) {
  if (sub === 'assets') continue;
  copyHtml(join(distDir, sub), sub);
}

console.log('Done.');
