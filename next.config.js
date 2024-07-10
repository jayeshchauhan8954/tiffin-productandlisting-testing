const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === "prod"

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beta.thepresence360.com'
      },
    ],
  },
  compiler: {
    removeConsole: isProd ? true : false
  },
  reactStrictMode: isProd ? true : false
}

module.exports = nextConfig
