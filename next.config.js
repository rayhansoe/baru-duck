/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/notes',
        permanent: true,
      },
    ]
  },
}
