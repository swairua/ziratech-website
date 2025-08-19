import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      port: 8080,
      host: "0.0.0.0",
      clientPort: 8080,
      timeout: 30000,
      overlay: false, // Disable error overlay to prevent HMR errors from showing
    },
    watch: {
      usePolling: true,
      interval: 2000, // Slower polling to reduce network stress
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
    cors: true,
    strictPort: false,
    origin: 'http://localhost:8080',
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
