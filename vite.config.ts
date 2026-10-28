import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The preview proxy forwards requests with a Host header of
// `<port>-<sandbox id>.$BASE44_SANDBOX_HOST_DOMAIN`, and the sandbox id rotates.
// Allow that wildcard only inside the preview environment.
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;
const previewAllowedHosts =
  process.env.BASE44_PREVIEW_MODE === '1' && sandboxHostDomain ? [`.${sandboxHostDomain}`] : [];

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: previewAllowedHosts,
  },
});
