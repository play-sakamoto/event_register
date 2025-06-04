import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from "@vitejs/plugin-react"

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3036,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3036,
    }
  },
  plugins: [
    RubyPlugin(),
    react()
  ],
})
