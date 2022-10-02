import preact from "@preact/preset-vite"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				lang: "eu",
				short_name: "Izenak",
				name: "izenak.eus - Euskal izenen bilatzailea",
				description:
					"Bilatu euskal izenak zure seme-alabentzat. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun izenak aurkitzeko aukera izango duzu.",
				icons: [
					{ src: "/icon-192.png", type: "image/png", sizes: "192x192" },
					{ src: "/icon-512.png", type: "image/png", sizes: "512x512" },
				],
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#ffffff",
			},
		}),
	],
})
