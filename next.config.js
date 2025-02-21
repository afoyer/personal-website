/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  auth: {
    trustHost: true,
  },
};

// Add this logging during build
console.log('Build-time environment check:', {
  hasFlickrKey: !!process.env.AUTH_FLICKR_KEY,
  hasFlickrUserId: !!process.env.AUTH_FLICKR_USER_ID,
  hasAuthUrl: !!process.env.AUTH_URL,
});

export default config;
