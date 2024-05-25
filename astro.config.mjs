import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://indyandie.github.io/',
  base: 'ebishi/',
  integrations: [svelte(), tailwind()]
});