import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import mix from "vite-plugin-mix";

export default defineConfig({
  plugins: [solid(), mix({handler: "./api.ts"})],
  build: {
    target: "esnext",
  },
});
