import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

module.exports = {
  server: {
    hmr: {
      overlay: false
    }
  }
};