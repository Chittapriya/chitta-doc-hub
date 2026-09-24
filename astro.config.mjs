import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.chittapriyamondal.com',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  redirects: {
    '/blog/2026/09/24/system-one-models-and-jev--fast-typed-decisions-for-software/': '/blog/system-one-model/',
    '/blog/2026/08/04/autonomy-in-modern-ai-systems/': '/blog/agent-autonomy/',
    '/blog/2023/01/23/wsl2-on-windows/': '/blog/wsl2-on-windows/',
    '/blog/2020/06/16/internet-protocol-suite/': '/blog/internet-protocol-suite/',
    '/blog/2017/11/13/digital-twin--actor-model/': '/blog/digital-twin-actor-model/',
  },
});
