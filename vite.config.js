import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.js'],
   },
   //added specific server to try and resolve the web socket issues
   // server: {
   //    host: 'localhost',
   //    port: 3000,
   //    strictPort: true, // if true, will throw an error if port is already in use
   // },
});
