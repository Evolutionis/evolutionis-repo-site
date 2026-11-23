// Pré-renderização da home: roda depois dos dois builds (cliente e SSR) e
// grava o dist/index.html já com o texto da página, o CSS embutido e o
// conteúdo inicial (JSON) para o hydrateRoot.
//
// Por que existe: no PageSpeed de 22/11/2026, 2,5 s do LCP no celular eram
// "atraso na renderização" — o HTML chegava vazio (<div id="root"></div>) e
// nada aparecia até o JavaScript baixar e executar.
//
// Só a home por enquanto. As páginas de serviço vivem na homologação até o
// conteúdo ser aprovado; quando forem para produção, este script dá lugar ao
// da homolog, que gera uma página por item de src/paginas.js e o sitemap.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(raiz, 'dist');
const distSsr = resolve(raiz, 'dist-ssr');
// Mesma regra do vite.config.js: sem a variável, é homologação.
const base = process.env.VITE_BASE || '/preview/';

const { render, conteudoDoBuild } = await import(pathToFileURL(resolve(distSsr, 'entry-server.js')).href);

// JSON dentro de <script>: "<" escapado impede que um "</script>" no conteúdo
// do CMS feche o bloco e vire HTML.
const jsonSeguro = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

/**
 * Troca o <link rel="stylesheet"> do CSS do site por <style> com o conteúdo.
 * O CSS tem ~6 KB comprimido e era a última solicitação bloqueando a
 * renderização (390 ms no PageSpeed): embutido, o texto pinta com o HTML.
 * A CSP já permite estilo embutido (style-src 'unsafe-inline').
 */
async function embutirCss(html) {
  const re = /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g;
  let saida = html;
  for (const [tag, href] of html.matchAll(re)) {
    if (!href.startsWith(base)) continue; // só o CSS do próprio site
    const css = await readFile(resolve(dist, href.slice(base.length)), 'utf8');
    saida = saida.replace(tag, () => `<style>${css}</style>`);
  }
  return saida;
}

const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const conteudo = conteudoDoBuild(JSON.parse(await readFile(resolve(raiz, 'public/content.json'), 'utf8')));

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: não achei <div id="root"></div> no index.html');
}
let html = template.replace(
  '<div id="root"></div>',
  () => `<div id="root">${render(conteudo)}</div>\n  <script id="conteudo-inicial" type="application/json">${jsonSeguro(conteudo)}</script>`
);
html = await embutirCss(html);
await writeFile(resolve(dist, 'index.html'), html);
console.log(`prerender: ${base} (CSS embutido)`);

await rm(distSsr, { recursive: true, force: true });
