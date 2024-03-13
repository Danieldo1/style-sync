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
      {
        protocol: "https",
        hostname: "stylesync.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
};

export default nextConfig;
