import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Tell Vite to ignore the Python backend completely
      ignored: ['**/disease_forecasting_api/**']
    }
  },
  optimizeDeps: {
    entries: ['index.html']
  }
})