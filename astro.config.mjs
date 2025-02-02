import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://ebishi.indieandy.cc/',
  integrations: [
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        useFsEvents: false,
        usePolling: true,
      },
    },
  },
})
