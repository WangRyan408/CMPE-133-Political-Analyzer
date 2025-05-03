/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'],
  },
  // Enable SWC minification for improved performance
  //swcMinify: true,
  // Configure compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src  'self' 'unsafe-inline'; img-src    'self' data: https:; font-src   'self'; connect-src 'self' http://localhost:8000 https:; frame-src  'self'; object-src 'none'; base-uri   'self'; form-action 'self';`
          }
        ]
      }
    ]
  }
};

export default nextConfig;
