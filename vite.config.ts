import { defineConfig } from 'vite'

// Serving static HTML directly - no React needed
export default defineConfig({
  // No plugins needed for static HTML
  appType: 'mpa',
})
