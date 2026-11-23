import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.VITE_BASE || '/preview/';

// A homologação é uma cópia do site. O robots.txt impede o rastreamento de
// /preview/, mas não a indexação se alguém linkar para lá; o meta robots
// impede. Decide pela mesma variável que separa os ambientes (VITE_BASE).
const robotsHomologacao = {
  name: 'robots-homologacao',
  transformIndexHtml() {
    if (base === '/') return [];
    return [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' }];
  },
};

export default defineConfig(({ isSsrBuild }) => ({
  // Onde o site vive no servidor. Homologação fica em /preview/ e produção na
  // raiz, e o caminho entra nos assets no momento do build — não dá para
  // decidir depois. O workflow de produção define VITE_BASE=/ ; sem a
  // variável, continua sendo /preview/, que é o comportamento de sempre.
  base,
  // Build SSR (só para o prerender): sem PWA — service worker é coisa do
  // navegador — e com o registro do SW trocado por um módulo vazio.
  resolve: isSsrBuild
    ? { alias: { 'virtual:pwa-register/react': fileURLToPath(new URL('./src/lib/pwa-register-ssr.js', import.meta.url)) } }
    : undefined,
  plugins: [
    react(),
    !isSsrBuild && robotsHomologacao,
    !isSsrBuild && VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon-32.png', 'apple-touch-icon.png', 'logo.png'],
      manifest: {
        name: 'Evolutionis Serviços',
        short_name: 'Evolutionis',
        description:
          'Limpeza profissional, paisagismo e controle de pragas para condomínios, empresas e indústrias.',
        lang: 'pt-BR',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#1E4E79',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // O vídeo é grande e precisa ficar de fora do precache; ele é servido
        // sob demanda pela regra de runtime abaixo.
        //
        // images/ também fica de fora, e por um motivo diferente: o precache é
        // tudo-ou-nada. Se UM arquivo listado devolver 404 no servidor (por
        // exemplo, uma imagem enviada pelo painel que não chegou ao FTP), a
        // instalação do service worker inteiro falha com bad-precaching-response
        // e nenhuma versão nova do site chega a ser ativada nem avisada. As
        // imagens do CMS são conteúdo, não estrutura do app: entram em cache
        // sob demanda, e uma faltando só quebra a si mesma.
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff2}'],
        globIgnores: ['**/servicos.*', '**/images/**'],
        // Sem navigateFallback: com ele, o service worker respondia QUALQUER
        // navegação com a home — inclusive /robots.txt e /sitemap.xml para quem
        // já tinha visitado o site (e, no futuro, as páginas de serviço). A
        // home segue no precache e abre offline como antes.
        // `null` explícito: omitir não basta, o vite-plugin-pwa assume
        // 'index.html' como padrão.
        navigateFallback: null,
        runtimeCaching: [
          {
            // REGRA CRÍTICA. O content.json é o que o CMS publica: se ele entrar
            // em cache, você publica no painel e o visitante continua vendo o
            // conteúdo antigo por dias, sem nenhum erro aparecer. Rede primeiro,
            // cache só como reserva para quando estiver offline.
            urlPattern: ({ url }) => url.pathname.endsWith('/content.json'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'conteudo-cms',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Imagens enviadas pelo painel. O nome leva o carimbo de hora do
            // upload (Date.now()-nome.png), então um arquivo nunca muda de
            // conteúdo sob o mesmo nome: CacheFirst é seguro. Só guarda 200
            // (um 404 não pode ficar em cache) e só do próprio domínio.
            urlPattern: ({ url }) =>
              url.origin === self.location.origin && url.pathname.includes('/images/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'imagens-cms',
              cacheableResponse: { statuses: [200] },
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 60 },
            },
          },
          // O vídeo dos serviços NÃO passa pelo service worker. A regra que havia
          // aqui (CacheFirst + rangeRequests, guardando 200 e 206) tentava pôr
          // respostas 206 no Cache Storage, que não aceita resposta parcial:
          // "Failed to execute 'put' on 'Cache': Partial response (status code
          // 206) is unsupported" a cada trecho baixado. E o cache nunca enchia,
          // porque o navegador só pede o vídeo em intervalos (Range).
          // Sem o SW no meio, o navegador trata os intervalos sozinho e o cache
          // HTTP (7 dias, .htaccess) cobre as visitas seguintes.
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  // No build SSR, os nomes com hash não servem: o prerender importa
  // dist-ssr/entry-server.js por nome fixo.
  build: isSsrBuild ? {} : {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
}));
