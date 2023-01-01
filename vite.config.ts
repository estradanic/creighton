import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: "public",
    target: "es6",
    rollupOptions: {
      output: {
        manualChunks: {
          parse: ["parse"],
          html2canvas: ["html2canvas"],
          jspdf: ["jspdf"],
          "es6-promise": ["es6-promise"],
        },
      },
    },
  },
});
