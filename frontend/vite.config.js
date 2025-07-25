import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/autocomplete': 'http://localhost:5000',
      '/review': 'http://localhost:5000'
    }
  }
})
