/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      // You can add other allowed image domains here as needed
    ],
  },
  // ... other Next.js config options
};

export default nextConfig;
