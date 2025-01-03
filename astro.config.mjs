import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://ebishi.indieandy.cc/',
  integrations: [
    svelte(),
    tailwind(),
  ],
})
