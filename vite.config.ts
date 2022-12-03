import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    target: "es6",
    rollupOptions: {
      output: {
        manualChunks: {
          parse: ["parse"],
        },
      },
    },
  },
});
