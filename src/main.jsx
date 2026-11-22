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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
