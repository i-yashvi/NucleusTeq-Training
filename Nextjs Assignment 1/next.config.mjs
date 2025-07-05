/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.washingtonpost.com',
      'arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com',
      'a4.espncdn.com',
      'images.pushsquare.com',
      'media.cnn.com',
      'ichef.bbci.co.uk',
      'variety.com',
      'cdn.mos.cms.futurecdn.net',
      'images2.minutemediacdn.com',
    ],
  },
};

export default nextConfig;
