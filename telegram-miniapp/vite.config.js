import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-axios': ['axios'],
          'vendor-wallet': ['@walletconnect/ethereum-provider'],
          'vendor-ton': ['@tonconnect/sdk', '@tonconnect/ui-react'],
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', 'localhost']
  },
  define: {
    'process.env': {}
  }
})
