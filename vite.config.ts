import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Use esbuild minification (default, faster and produces smaller output)
    minify: 'esbuild',
    // Target modern browsers for smaller output
    target: 'es2020',
    // Skip sourcemaps in production — saves significant bundle size + bandwidth
    sourcemap: false,
    // Warn on chunks > 1 MB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Object form avoids circular dependency issues the function form can cause
        manualChunks: {
          // Core React — react-dom must be with react to avoid circulars
          'vendor-react': ['react', 'react-dom'],
          // Three.js ecosystem — deferred until 3D sections scroll into view
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Animation library
          'vendor-motion': ['motion'],
          // Icon library
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
  },
})
