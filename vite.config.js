import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/preview/',
  plugins: [react()],
  build: {
    assetsDir: 'public/assets',
    rollupOptions: {
      output: {
        assetFileNames: 'public/assets/[name]-[hash][extname]',
      },
    },
  },
});
