import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Onde o site vive no servidor. Homologação fica em /preview/ e produção na
  // raiz, e o caminho entra nos assets no momento do build — não dá para
  // decidir depois. O workflow de produção define VITE_BASE=/ ; sem a
  // variável, continua sendo /preview/, que é o comportamento de sempre.
  base: process.env.VITE_BASE || '/preview/',
  plugins: [
    react(),
    VitePWA({
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
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff2}'],
        globIgnores: ['**/servicos.*'],
        navigateFallback: 'index.html',
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
            // O filme dos serviços: pesado e imutável entre deploys.
            urlPattern: ({ url }) => /\/servicos\.(mp4|webm)$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'video-servicos',
              // rangeRequests é obrigatório: sem ele o service worker devolve a
              // resposta inteira para um pedido de intervalo e o vídeo deixa de
              // poder ser buscado — que é justamente o que a rolagem faz.
              rangeRequests: true,
              cacheableResponse: { statuses: [200, 206] },
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 60 },
            },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'fontes-css' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fontes-arquivos',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
