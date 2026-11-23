// Substitui 'virtual:pwa-register/react' só no build SSR (ver vite.config.js).
// O módulo real registra o service worker — coisa de navegador. No servidor o
// aviso de atualização só precisa renderizar "nada", igual ao primeiro render
// do navegador, para o hydrateRoot bater.
export function useRegisterSW() {
  return { needRefresh: [false, () => {}], offlineReady: [false, () => {}], updateServiceWorker: () => {} };
}
