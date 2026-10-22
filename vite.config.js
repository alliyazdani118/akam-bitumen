import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The sandbox preview sits behind a proxy that may address the dev server
// either by its sandbox hostname or by the app's public preview host, and the
// page is served over https on the proxy's default port. Both host forms are
// derived from the environment at runtime — nothing is hardcoded, because the
// sandbox id rotates between environments.
// `BASE44_PREVIEW_MODE` is set to exactly "1" only inside the sandbox preview;
// with it unset this config is a plain, unmodified Vite setup.
const isPreview = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;
const publicHostSuffix = process.env.BASE44_PUBLIC_HOST_SUFFIX;

function previewAllowedHosts() {
  const hosts = ['localhost', '127.0.0.1'];
  // A leading dot matches the hostname itself and any subdomain of it.
  if (sandboxHostDomain) hosts.push(`.${sandboxHostDomain}`);
  if (publicHostSuffix) hosts.push(`3000-${publicHostSuffix}`);
  return hosts;
}

// The newsletter and contact forms post to the small JSON API in `server/`.
// In development the dev server proxies /api to it, so the browser always
// talks to its own origin (no CORS, no absolute URLs in the bundle).
const apiTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:4000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
    },
    watch: isPreview ? { usePolling: true, interval: 400 } : undefined,
    ...(isPreview
      ? {
          allowedHosts: previewAllowedHosts(),
          // The preview is served over https on the proxy's default port, so
          // the HMR websocket has to talk to port 443 rather than 5173.
          hmr: { clientPort: 443 },
        }
      : {}),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
