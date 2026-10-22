import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		tailwindcss(),
		reactRouter(),
		tsconfigPaths()
	],
	environments: {
		client: { build: { outDir: 'build/client' } },
		ssr: { build: { outDir: 'build/server' } }
	},
	server: {
		allowedHosts: ['aardvark-poetic-poodle.ngrok-free.app']
	}
})
