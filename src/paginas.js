import { dedetizacao } from './data/paginas/dedetizacao';

// Endereço oficial (https, sem www). Canonical, sitemap e dados estruturados
// apontam sempre para cá — inclusive no build de homologação, que é só cópia.
export const SITE = 'https://evolutionis.com.br';

// Fonte única das páginas do site. O prerender gera um HTML por item e o
// sitemap.xml a partir desta lista: página nova entra aqui e em mais nenhum
// lugar, e não tem como ficar fora do sitemap por esquecimento.
//
// `caminho` é relativo à base do build ('/' em produção, '/preview/' em
// homologação) e termina em '/', porque cada página vira <caminho>/index.html
// e o Apache redireciona a versão sem barra para a com barra.
export const PAGINAS = [
  { caminho: '', tipo: 'home' },
  { caminho: dedetizacao.caminho, tipo: 'servico', dados: dedetizacao },
];

const BASE = import.meta.env.BASE_URL || '/';

/** Link interno, respeitando a base do build. */
export function href(caminho = '') {
  return BASE + caminho;
}

/** Página correspondente a um pathname do navegador (ou do prerender). */
export function paginaPorPathname(pathname) {
  let rel = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, '');
  rel = rel.replace(/index\.html$/, '');
  if (rel && !rel.endsWith('/')) rel += '/';
  return PAGINAS.find((p) => p.caminho === rel) || PAGINAS[0];
}
