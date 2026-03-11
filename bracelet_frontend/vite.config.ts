import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      "/api" : {
        // This is the django server address
        // Replace if hosting!!
        // target: 'http://localhost:8000',
        // target: "http://192.0.2.215:8000",
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    // added to attempt to get images to load on phonr
    // "/media": {
    //     // target: "http://192.0.2.215:8000",
    //     target: 'http://localhost:8000',
    //     changeOrigin: true,
    // },
    }
  }
})
