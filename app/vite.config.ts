import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const resolve = (dir: string) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Aliases
  resolve: {
    alias: {
      "@": resolve("src"),
      panda: resolve("styled-system"),
    },
  },
});
