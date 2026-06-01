module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    optimizePackageImports: ['firebase', 'tailwindcss', '@tailwindcss/postcss'],
  },
}