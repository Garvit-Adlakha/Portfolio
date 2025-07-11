import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'gsap', '@gsap/react'],
          'ui-vendor': ['react-modal', 'react-scroll', 'react-lazy-load-image-component'],
        }
      },
      // Suppress eval warnings from three-stdlib/lottie since we don't use it
      onwarn(warning, warn) {
        if (warning.code === 'EVAL' && warning.id?.includes('three-stdlib/libs/lottie.js')) {
          return; // Suppress this specific warning
        }
        warn(warning);
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
    minify: 'esbuild', // Use esbuild instead of terser for faster builds
    target: 'esnext',
    reportCompressedSize: false, // Faster builds on Vercel
    // Optimize for Vercel deployment
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    force: true,
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    // Vercel environment variables
    'process.env.VERCEL_URL': JSON.stringify(process.env.VERCEL_URL || ''),
    'process.env.VERCEL_ENV': JSON.stringify(process.env.VERCEL_ENV || 'development'),
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
}))
