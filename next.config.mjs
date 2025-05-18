/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure headers to ensure proper loading of WASM files
  async headers() {
    return [
      {
        source: '/vosk.js',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          }
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          }
        ],
      }
    ];
  },
};

export default nextConfig; 