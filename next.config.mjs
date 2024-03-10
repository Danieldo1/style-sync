/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "d14uq1pz7dzsdq.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
