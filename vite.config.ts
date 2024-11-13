import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), TanStackRouterVite(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
