/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    env: {
        BASE_URL: process.env.API_URL,
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },
}
module.exports = nextConfig
