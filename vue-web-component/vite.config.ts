
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: "src/main.js",
      name: "MyVueComponent",
      fileName: "my-vue-component",
      formats: ["es"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});