/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: [
    'ui',
    'auth',
    'database',
    'utils',
    '@elzatona/shared-components',
    '@elzatona/shared-contexts',
    '@elzatona/shared-hooks',
    '@elzatona/shared-atoms',
    '@elzatona/shared-types',
    'nuqs',
  ],
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

module.exports = nextConfig;
