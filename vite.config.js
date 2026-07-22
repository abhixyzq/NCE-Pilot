import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auth: resolve(__dirname, 'auth.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        instructions: resolve(__dirname, 'instructions.html'),
        editor: resolve(__dirname, 'editor.html'),
        result: resolve(__dirname, 'result.html'),
        teacher: resolve(__dirname, 'teacher.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  }
});
