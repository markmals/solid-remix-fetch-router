import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import devtools from "solid-devtools/vite";

export default defineConfig({
    plugins: [solid(), devtools()],
    server: {
        port: 1612,
    },
    experimental: {
        enableNativePlugin: true,
    },
    resolve: {
        tsconfigPaths: true,
    },
    build: {
        rollupOptions: {
            input: {
                main: "./index.html",
                worker: "./entry.worker.ts",
            },
            output: {
                entryFileNames: chunkInfo => {
                    return chunkInfo.name === "entry.worker"
                        ? "entry.worker.js"
                        : "[name]-[hash].js";
                },
            },
        },
    },
});
