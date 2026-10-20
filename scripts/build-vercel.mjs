import {copyFile, cp, mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {composeProductionLanding,composeProductionRuntime,composeProductionDemo} from './production-landing.mjs';
const root = new URL('../', import.meta.url);
await mkdir(new URL('public/', root), {recursive:true});
for (const file of ['styles.css', 'focus-modality.js', 'analytics.js']) {
  await copyFile(new URL(file, root), new URL(`public/${file}`, root));
}
// The framework-neutral SDK is a self-contained browser ES module. Serve it
// locally so the static landing needs neither React nor an external CDN.
await copyFile(fileURLToPath(import.meta.resolve('@vercel/analytics')), new URL('public/vercel-analytics.js', root));
const base=await readFile(new URL('index.html',root),'utf8');
const original=await readFile(new URL('script.js',root),'utf8');
await writeFile(new URL('public/index.html',root),composeProductionLanding(base));
await writeFile(new URL('public/script.js',root),composeProductionRuntime(original));
const integration=await readFile(new URL('public/prototype/landing/integration.css',root),'utf8');
await writeFile(new URL('public/landing.css',root),integration.replaceAll('data-local-preview="true"','data-landing-version="companion"'));
const demo=await readFile(new URL('public/prototype/cases-demo.html',root),'utf8');
await writeFile(new URL('public/demo.html',root),composeProductionDemo(demo));
await copyFile(new URL('public/prototype/cases-demo.css',root),new URL('public/demo.css',root));
await copyFile(new URL('public/prototype/cases-demo.js',root),new URL('public/demo.js',root));
for (const dir of ['assets', 'fonts']) {
  await cp(new URL(dir, root), new URL(`public/${dir}`, root), {recursive:true});
}
console.log(`Production companion landing + live beta API client ready in ${fileURLToPath(new URL('public/', root))}`);
