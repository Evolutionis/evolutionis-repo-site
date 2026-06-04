import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' garante caminhos relativos, importante para hospedagem em
// subdiretório ou raiz do public_html da Locaweb.
export default defineConfig({
  base: './',
  plugins: [react()],
});
