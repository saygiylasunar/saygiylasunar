import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// __dirname yerine process.cwd() kullanmak daha güvenli
const r = (...paths) => resolve(process.cwd(), ...paths);

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: r('index.html'),
        cekilis: r('cekilis.html'),
      },
    },
  },
});
