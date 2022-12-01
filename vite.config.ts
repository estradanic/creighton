import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import mix, {vercelAdapter} from "vite-plugin-mix";

export default defineConfig({
  plugins: [solid(), mix({handler: "./api.ts", adapter: vercelAdapter()})],
  build: {
    target: "esnext",
  },
});
