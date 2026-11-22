import { dedetizacao } from './data/paginas/dedetizacao';
import { paisagismo } from './data/paginas/paisagismo';
import { limpezaPosObra } from './data/paginas/limpezaPosObra';
import { limpezaFachada } from './data/paginas/limpezaFachada';
import { tratamentoPiso } from './data/paginas/tratamentoPiso';
import { limpezaCaixaDagua } from './data/paginas/limpezaCaixaDagua';
import { listaServicos } from './data/paginas/servicos';

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
const SERVICOS = [dedetizacao, paisagismo, limpezaPosObra, limpezaFachada, tratamentoPiso, limpezaCaixaDagua];

export const PAGINAS = [
  { caminho: '', tipo: 'home' },
  { caminho: listaServicos.caminho, tipo: 'lista', dados: listaServicos },
  ...SERVICOS.map((d) => ({ caminho: d.caminho, tipo: 'servico', dados: d })),
];

/** Página de um serviço pela `chave` do content.json (servicos.itens). */
export function paginaDoServico(chave) {
  return PAGINAS.find((p) => p.tipo === 'servico' && p.dados.chave === chave);
}

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
