import { defineConfig } from "vite";
import { vavite } from "vavite";
import { swc } from "rollup-plugin-swc3";
import react from '@vitejs/plugin-react';
import devtoolsJson from 'vite-plugin-devtools-json';
import { resolve } from "node:path";

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	buildSteps: [
		{
			name: "client",
			config: {
				build: {
					outDir: "dist/client",
					manifest: true,
					// rollupOptions: { input: "entry-client.tsx" },
				},
			},
		},
		{
			name: "server",
			config: {
				build: {
					ssr: true,
					outDir: "dist/server",
				},
			},
		},
	],
	ssr: {
		external: ["reflect-metadata"],
	},
	esbuild: false,
	plugins: [
		react(),
		devtoolsJson(),
		{
			...swc({
				jsc: {
					transform: {
						decoratorMetadata: true,
						legacyDecorator: true,
					},
					target: "es2021",
				},
			}),
			enforce: "pre", // Make sure this is applied before anything else
		},
		vavite({
			handlerEntry: "/src/main.ts",
			serveClientAssetsInDev: true,
		}),
	],
});
