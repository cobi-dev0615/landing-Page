import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'force-pdf-download',
      configureServer(server) {
        server.middlewares.use('/media/ebook.pdf', (req, res, next) => {
          res.setHeader('Content-Disposition', 'attachment; filename="ebook.pdf"')
          res.setHeader('Content-Type', 'application/pdf')
          next()
        })
      }
    }
  ],
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
