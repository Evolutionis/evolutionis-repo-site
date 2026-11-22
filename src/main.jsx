import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Fontes servidas pelo próprio site, só o subconjunto latino e só os pesos
// usados. Antes vinham do Google Fonts: um CSS de outro domínio que bloqueava
// a renderização (PageSpeed, 22/11/2026) e mais duas conexões antes do texto.
import '@fontsource/archivo/latin-600.css';
import '@fontsource/archivo/latin-700.css';
import '@fontsource/archivo/latin-800.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
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
    <App inicial={conteudoInicial()} />
  </React.StrictMode>
);

// HTML pré-renderizado: o React adota a marcação existente em vez de apagar e
// redesenhar (sem piscar, e o texto que o Google leu é o mesmo que fica na tela).
if (raiz.hasChildNodes()) ReactDOM.hydrateRoot(raiz, app);
else ReactDOM.createRoot(raiz).render(app);
