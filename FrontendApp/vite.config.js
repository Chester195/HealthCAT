import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'a5fa-2806-102e-1e-438c-4cbd-148d-ab69-f3a4.ngrok-free.app'
    ]
  }
})
