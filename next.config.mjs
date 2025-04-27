//** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.refabry.com",
        port: "",
        pathname: "/storage/product/**",
      },
    ],
  },
  // ... other Next.js config options
};

export default nextConfig;
