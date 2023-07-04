/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'evan.beee.top',
            port: '',
            pathname: '/img/**',
          },
        ],
      },
}

module.exports = nextConfig
