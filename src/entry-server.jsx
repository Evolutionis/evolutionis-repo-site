// Entrada do build SSR, usada só pelo scripts/prerender.mjs. Não vai para o
// navegador.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { merge } from './hooks/useContent';
import { DEFAULTS } from './data/defaults';

/** Mesma mescla que o navegador faz ao receber o content.json. */
export function conteudoDoBuild(json) {
  return merge(DEFAULTS, json);
}

export function render(inicial) {
  return renderToString(
    <React.StrictMode>
      <App inicial={inicial} />
    </React.StrictMode>
  );
}
