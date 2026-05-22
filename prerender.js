import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');

const routes = [
  { path: '/', title: 'myunioffer ai — Get into your dream university', desc: 'AI coaching, PS scoring, draft building, and interview prep. Everything you need to stand out, built by students who just got in.' },
  { path: '/pricing', title: 'Pricing — myunioffer ai', desc: 'Free coaching forever. Premium is £9.99/month for full PS feedback, the Draft Builder, and extended coaching. Cancel anytime.' },
  { path: '/about', title: 'About Us — myunioffer ai', desc: 'Built by five first-year students from LSE, Cambridge, Warwick, KCL, and Imperial who went through UCAS and wanted to make it easier.' },
  { path: '/rate-my-ps', title: 'Rate My Personal Statement — Free PS Scorer | myunioffer', desc: 'Paste your personal statement and get scored out of 100 in 30 seconds. Free, no account needed. Calibrated against real admissions standards.' },
  { path: '/signup', title: 'Sign Up Free — myunioffer ai', desc: 'Create a free account and start coaching your university application. AI personal statement help, supercurricular advice, and interview prep.' },
  { path: '/blog', title: 'Blog: UCAS advice from students who just got in | myunioffer', desc: 'Practical guides for personal statements, supercurriculars, and interviews. Written by students at LSE, Cambridge, Warwick, KCL, and Imperial.' },
  { path: '/blog/year-12-summer-ucas', title: 'What to do in Year 12 summer for UCAS 2026 | myunioffer', desc: 'A first-year LSE student on what actually matters the summer before you apply to university, and what turned out to be a complete waste of time.' },
];

function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);
      if (!filePath.includes('.')) {
        filePath = join(distDir, 'index.html');
      }
      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const types = { html: 'text/html', js: 'application/javascript', css: 'text/css', json: 'application/json', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', woff2: 'font/woff2' };
        res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        try {
          const content = readFileSync(join(distDir, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        } catch {
          res.writeHead(404);
          res.end('Not found');
        }
      }
    });
    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  console.log('Starting pre-render...');
  const port = 4173;
  const server = await startServer(port);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `http://localhost:${port}${route.path}`;

    console.log(`  Rendering ${route.path}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to finish rendering
    await new Promise(r => setTimeout(r, 1500));

    // Inject correct title and meta tags
    await page.evaluate((meta) => {
      document.title = meta.title;

      function setMeta(attr, key, value) {
        let el = document.querySelector(`meta[${attr}="${key}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, key);
          document.head.appendChild(el);
        }
        el.setAttribute('content', value);
      }

      setMeta('name', 'description', meta.desc);
      setMeta('property', 'og:title', meta.title);
      setMeta('property', 'og:description', meta.desc);
      setMeta('property', 'og:url', 'https://myunioffer.com' + meta.path);
      setMeta('property', 'og:type', 'website');
      setMeta('property', 'og:site_name', 'myunioffer ai');
      setMeta('name', 'twitter:card', 'summary');
      setMeta('name', 'twitter:title', meta.title);
      setMeta('name', 'twitter:description', meta.desc);
    }, route);

    const html = await page.content();

    const outDir = route.path === '/' ? distDir : join(distDir, route.path.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`  Saved ${route.path} (${html.length} bytes)`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`Pre-rendered ${routes.length} routes.`);
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
