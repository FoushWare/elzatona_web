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
  ],
};

module.exports = nextConfig;
