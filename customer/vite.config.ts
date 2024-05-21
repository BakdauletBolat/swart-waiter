import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@b_components': path.resolve(__dirname, '../shared/components'),
    },
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag: any) => tag.includes('swiper')
      }
    }
  })],
})
