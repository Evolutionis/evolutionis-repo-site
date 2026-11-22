import React from 'react';
import ReactDOM from 'react-dom/client';
import Raiz from './Raiz';
import './styles/tokens.css';

// O prerender embute no HTML o conteúdo que usou para gerar a página. O
// primeiro render no navegador parte dele, para ser idêntico ao HTML — a
// condição do hydrateRoot. Sem o bloco (npm run dev), parte do padrão.
function conteudoInicial() {
  const el = document.getElementById('conteudo-inicial');
  if (!el) return null;
  try {
    return JSON.parse(el.textContent);
  } catch {
    return null;
  }
}

const raiz = document.getElementById('root');
const app = (
  <React.StrictMode>
    <Raiz pathname={window.location.pathname} inicial={conteudoInicial()} />
  </React.StrictMode>
);

// HTML pré-renderizado: o React adota a marcação existente em vez de apagar e
// redesenhar (sem piscar, e o texto que o Google leu é o mesmo que fica na tela).
if (raiz.hasChildNodes()) ReactDOM.hydrateRoot(raiz, app);
else ReactDOM.createRoot(raiz).render(app);
