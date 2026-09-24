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
    // Old MkDocs URLs
    '/blog/2026/09/24/system-one-models-and-jev--fast-typed-decisions-for-software/': '/insights/system-one-model/',
    '/blog/2026/08/04/autonomy-in-modern-ai-systems/': '/insights/agent-autonomy/',
    '/blog/2023/01/23/wsl2-on-windows/': '/insights/wsl2-on-windows/',
    '/blog/2020/06/16/internet-protocol-suite/': '/insights/internet-protocol-suite/',
    '/blog/2017/11/13/digital-twin--actor-model/': '/insights/digital-twin-actor-model/',
    // Section was briefly served at /blog/ before being renamed to /insights/
    '/blog/': '/insights/',
    '/blog/[slug]': '/insights/[slug]',
  },
});
