import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/glitcher.js',
        style: 'src/glitcher.scss',
      },
      output: {
        entryFileNames: 'glitcher.js',
        assetFileNames: '[name].[ext]',
      }
    }
  }
})