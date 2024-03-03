import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //host: '0.0.0.0',      port: 3000,
      proxy: {
          '/auth':{
            target: 'http://localhost:3000',
              secure: false,
          }
      }
  }
})
