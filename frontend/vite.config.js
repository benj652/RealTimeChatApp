import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
  return {
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
        },
      },
    },
  };
});
