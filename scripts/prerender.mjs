// Pré-renderização: roda depois dos dois builds (cliente e SSR) e grava um
// HTML por página em dist/<caminho>/index.html, já com o texto, o <head> da
// página e o conteúdo inicial embutido para o hydrateRoot. Gera também o
// sitemap.xml a partir da mesma lista de páginas (src/paginas.js).
//
// Por que existe: o site é estático na Locaweb. Sem um arquivo por página, um
// acesso direto a /dedetizacao-e-controle-de-pragas/ daria 404 no servidor; e
// com um arquivo por página, título, descrição e texto chegam no HTML — sem
// depender de o Google (ou o preview do WhatsApp) executar JavaScript.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(raiz, 'dist');
const distSsr = resolve(raiz, 'dist-ssr');
// Mesma regra do vite.config.js: sem a variável, é homologação.
const base = process.env.VITE_BASE || '/preview/';

const { render, conteudoDoBuild, PAGINAS, SITE } = await import(
  pathToFileURL(resolve(distSsr, 'entry-server.js')).href
);

const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const conteudo = conteudoDoBuild(JSON.parse(await readFile(resolve(raiz, 'public/content.json'), 'utf8')));

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON dentro de <script>: "<" escapado impede que um "</script>" no conteúdo
// do CMS feche o bloco e vire HTML.
const jsonSeguro = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function trocar(html, de, para, rotulo) {
  if (!de.test(html)) throw new Error(`prerender: não achei ${rotulo} no index.html`);
  return html.replace(de, para);
}

function empresa() {
  const c = conteudo.contato;
  return {
    '@type': 'LocalBusiness',
    name: 'Evolutionis Serviços Ltda.',
    url: `${SITE}/`,
    telephone: `+${String(c.whatsapp).replace(/\D/g, '')}`,
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.endereco,
      addressLocality: 'São Roque',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
  };
}

function trilha(pagina) {
  const itens = [{ name: 'Início', item: `${SITE}/` }, { name: 'Serviços', item: `${SITE}/servicos/` }];
  if (pagina.tipo === 'servico') itens.push({ name: pagina.dados.hero.eyebrow, item: `${SITE}/${pagina.caminho}` });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((it, i) => ({ '@type': 'ListItem', position: i + 1, ...it })),
  };
}

/** <head> de toda página que não é a home: lista de serviços e cada serviço. */
function headPagina(html, pagina) {
  const d = pagina.dados;
  const url = `${SITE}/${pagina.caminho}`;
  html = trocar(html, /<title>[\s\S]*?<\/title>/, `<title>${attr(d.seo.titulo)}</title>`, '<title>');
  html = trocar(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${attr(d.seo.descricao)}">`, 'meta description');
  html = trocar(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${attr(url)}">`, 'canonical');

  const dados = [trilha(pagina)];
  if (pagina.tipo === 'servico') {
    dados.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: d.hero.titulo,
      serviceType: d.hero.eyebrow,
      description: d.seo.descricao,
      url,
      areaServed: d.regioes.cidades.map((nome) => ({ '@type': 'City', name: nome })),
      provider: empresa(),
    });
  }

  const extra = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:title" content="${attr(d.seo.titulo)}">`,
    `<meta property="og:description" content="${attr(d.seo.descricao)}">`,
    `<meta property="og:url" content="${attr(url)}">`,
    ...dados.map((o) => `<script type="application/ld+json">${jsonSeguro(o)}</script>`),
  ].join('\n  ');
  return html.replace('</head>', `  ${extra}\n</head>`);
}

for (const pagina of PAGINAS) {
  const corpo = render(base + pagina.caminho, conteudo);
  let html = trocar(
    template,
    /<div id="root"><\/div>/,
    `<div id="root">${corpo}</div>\n  <script id="conteudo-inicial" type="application/json">${jsonSeguro(conteudo)}</script>`,
    '<div id="root"></div>'
  );
  if (pagina.tipo !== 'home') html = headPagina(html, pagina);

  const destino = resolve(dist, pagina.caminho, 'index.html');
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, html);
  console.log(`prerender: ${base}${pagina.caminho}`);
}

const hoje = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGINAS.map((p) => `  <url>\n    <loc>${SITE}/${p.caminho}</loc>\n    <lastmod>${hoje}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
console.log(`prerender: sitemap.xml com ${PAGINAS.length} URLs`);

await rm(distSsr, { recursive: true, force: true });
