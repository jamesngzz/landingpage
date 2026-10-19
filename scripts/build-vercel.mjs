import {copyFile, cp, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root = new URL('../', import.meta.url);
await mkdir(new URL('public/', root), {recursive:true});
for (const file of ['index.html', 'script.js', 'styles.css']) {
  await copyFile(new URL(file, root), new URL(`public/${file}`, root));
}
for (const dir of ['assets', 'fonts']) {
  await cp(new URL(dir, root), new URL(`public/${dir}`, root), {recursive:true});
}
console.log(`Static landing page ready in ${fileURLToPath(new URL('public/', root))}`);
