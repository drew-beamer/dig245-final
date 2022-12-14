/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        port: ''
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true }
}

module.exports = nextConfig
