// Entrada do build SSR, usada só pelo scripts/prerender.mjs. Não vai para o
// navegador.
import React from 'react';
import { renderToString } from 'react-dom/server';
import Raiz from './Raiz';
import { merge } from './hooks/useContent';
import { DEFAULTS } from './data/defaults';

export { PAGINAS, SITE } from './paginas';

/** Mesma mescla que o navegador faz ao receber o content.json. */
export function conteudoDoBuild(json) {
  return merge(DEFAULTS, json);
}

export function render(pathname, inicial) {
  return renderToString(
    <React.StrictMode>
      <Raiz pathname={pathname} inicial={inicial} />
    </React.StrictMode>
  );
}
